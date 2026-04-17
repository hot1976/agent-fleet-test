# 前后端分离架构迁移指南

## 迁移概述

本指南描述如何将现有的Next.js项目从当前架构迁移到前后端分离的新架构。

## 当前架构分析

### 现有目录结构
```
src/
├── app/
│   ├── api/
│   │   └── posts/          # API路由
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── api.ts              # API客户端
│   ├── prisma.ts           # Prisma客户端
│   └── redis.ts            # Redis客户端
└── types/
    └── index.ts
```

### 迁移目标
- 将前端代码组织到 `src/frontend/`
- 将后端代码组织到 `src/backend/`
- 将共享代码组织到 `src/shared/`

## 迁移步骤

### 第一阶段：准备工作

#### 1. 创建新目录结构
```bash
# 创建前端目录
mkdir -p src/frontend/modules/{home,posts,auth}/{components,hooks,services,types}
mkdir -p src/frontend/shared/{components,hooks,utils,types,store}

# 创建后端目录
mkdir -p src/backend/modules/{posts,auth,user}/{services,controllers,dto,validators}
mkdir -p src/backend/shared/{services,middleware,utils,database,types}

# 创建共享目录
mkdir -p src/shared/{types,constants,utils}
```

#### 2. 更新TypeScript配置
确保 `tsconfig.json` 包含路径别名：
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/frontend/*": ["./src/frontend/*"],
      "@/backend/*": ["./src/backend/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### 第二阶段：后端迁移

#### 1. 迁移API路由

**原文件：** `src/app/api/posts/route.ts`
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const data = await request.json()
  const post = await prisma.post.create({ data })
  return NextResponse.json(post)
}
```

**新架构：**

**Step 1: 创建DTO**
```typescript
// src/backend/modules/posts/dto/CreatePostDto.ts
export interface CreatePostDto {
  title: string
  content: string
  published?: boolean
  authorId: string
}

export interface UpdatePostDto {
  title?: string
  content?: string
  published?: boolean
}
```

**Step 2: 创建Service**
```typescript
// src/backend/modules/posts/services/PostService.ts
import { prisma } from '@/backend/shared/database'
import { CreatePostDto, UpdatePostDto } from '../dto'

export class PostService {
  async findAll() {
    return await prisma.post.findMany({
      include: { author: true }
    })
  }

  async findOne(id: string) {
    return await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    })
  }

  async create(data: CreatePostDto) {
    return await prisma.post.create({
      data,
      include: { author: true }
    })
  }

  async update(id: string, data: UpdatePostDto) {
    return await prisma.post.update({
      where: { id },
      data,
      include: { author: true }
    })
  }

  async remove(id: string) {
    return await prisma.post.delete({
      where: { id }
    })
  }
}

export const postService = new PostService()
```

**Step 3: 创建Controller**
```typescript
// src/backend/modules/posts/controllers/PostController.ts
import { postService } from '../services/PostService'
import { NextRequest, NextResponse } from 'next/server'

export class PostController {
  async getMany() {
    const posts = await postService.findAll()
    return NextResponse.json({
      success: true,
      data: posts
    })
  }

  async getOne(id: string) {
    const post = await postService.findOne(id)
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true, data: post })
  }

  async create(request: NextRequest) {
    const data = await request.json()
    const post = await postService.create(data)
    return NextResponse.json({ success: true, data: post })
  }

  async update(id: string, request: NextRequest) {
    const data = await request.json()
    const post = await postService.update(id, data)
    return NextResponse.json({ success: true, data: post })
  }

  async remove(id: string) {
    await postService.remove(id)
    return NextResponse.json({ success: true })
  }
}

export const postController = new PostController()
```

**Step 4: 更新API路由**
```typescript
// src/app/api/posts/route.ts
import { postController } from '@/backend/modules/posts/controllers/PostController'

export async function GET() {
  return await postController.getMany()
}

export async function POST(request: Request) {
  return await postController.create(request)
}
```

```typescript
// src/app/api/posts/[id]/route.ts
import { postController } from '@/backend/modules/posts/controllers/PostController'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return await postController.getOne(params.id)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return await postController.update(params.id, request)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return await postController.remove(params.id)
}
```

#### 2. 迁移共享后端代码

**原文件：** `src/lib/prisma.ts`
```typescript
// 移动到 src/backend/shared/database/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

**原文件：** `src/lib/redis.ts`
```typescript
// 移动到 src/backend/shared/database/redis.ts
import Redis from 'ioredis'

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD
})

export { redis }
export const cache = {
  async get(key: string) {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  },

  async set(key: string, value: any, ttl?: number) {
    const data = JSON.stringify(value)
    if (ttl) {
      await redis.setex(key, ttl, data)
    } else {
      await redis.set(key, data)
    }
  },

  async del(key: string) {
    await redis.del(key)
  }
}
```

### 第三阶段：前端迁移

#### 1. 创建前端模块

**创建Posts模块**

**Step 1: 定义模块类型**
```typescript
// src/frontend/modules/posts/types/index.ts
export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
  author?: {
    id: string
    name: string | null
    email: string
  }
}

export interface CreatePostInput {
  title: string
  content: string
  published?: boolean
}

export interface UpdatePostInput {
  title?: string
  content?: string
  published?: boolean
}
```

**Step 2: 创建API服务**
```typescript
// src/frontend/modules/posts/services/postsApi.ts
import { Post, CreatePostInput, UpdatePostInput } from '../types'

class PostsApi {
  private baseUrl = '/api/posts'

  async findAll(): Promise<Post[]> {
    const response = await fetch(this.baseUrl)
    const data = await response.json()
    return data.data
  }

  async findOne(id: string): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/${id}`)
    const data = await response.json()
    return data.data
  }

  async create(input: CreatePostInput): Promise<Post> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    const data = await response.json()
    return data.data
  }

  async update(id: string, input: UpdatePostInput): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    const data = await response.json()
    return data.data
  }

  async remove(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
  }
}

export const postsApi = new PostsApi()
```

**Step 3: 创建自定义Hooks**
```typescript
// src/frontend/modules/posts/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '../services/postsApi'
import { CreatePostInput, UpdatePostInput } from '../types'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postsApi.findAll()
  })
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => postsApi.findOne(id)
  })
}

export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostInput) => postsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostInput }) =>
      postsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => postsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}
```

**Step 4: 创建组件**
```typescript
// src/frontend/modules/posts/components/PostList.tsx
import { usePosts, useDeletePost } from '../hooks/usePosts'

export function PostList() {
  const { data: posts, isLoading } = usePosts()
  const deletePost = useDeletePost()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {posts?.map(post => (
        <div key={post.id} className="border p-4 rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
          <button
            onClick={() => deletePost.mutate(post.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
```

**Step 5: 模块导出**
```typescript
// src/frontend/modules/posts/index.ts
export * from './components/PostList'
export * from './hooks/usePosts'
export * from './services/postsApi'
export * from './types'
```

#### 2. 创建共享前端组件

```typescript
// src/frontend/shared/components/Button/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded font-medium transition-colors'

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  )
}
```

### 第四阶段：页面迁移

#### 更新页面使用新模块

```typescript
// src/app/posts/page.tsx
import { PostList } from '@/frontend/modules/posts'

export default function PostsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <PostList />
    </div>
  )
}
```

### 第五阶段：共享类型迁移

```typescript
// src/shared/types/post.ts
export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
}

// src/shared/types/index.ts
export * from './post'
```

## 迁移检查清单

### 后端迁移
- [ ] 创建backend目录结构
- [ ] 迁移数据库相关代码到backend/shared/database/
- [ ] 为每个API创建对应的Service
- [ ] 为每个API创建对应的Controller
- [ ] 为每个API创建对应的DTO
- [ ] 更新API路由使用新的Controller

### 前端迁移
- [ ] 创建frontend目录结构
- [ ] 为每个功能创建模块
- [ ] 创建模块的types、services、hooks、components
- [ ] 创建共享组件和hooks
- [ ] 更新页面使用新的模块

### 共享代码
- [ ] 创建shared目录
- [ ] 迁移共享类型定义
- [ ] 迁移共享常量
- [ ] 迁移共享工具函数

## 测试策略

1. **单元测试** - 为每个Service和Hook编写单元测试
2. **集成测试** - 测试API端点
3. **E2E测试** - 测试完整的用户流程

## 回滚策略

如果迁移出现问题，可以：
1. 保留原有代码，新代码并行运行
2. 逐步回滚到旧代码
3. 修复问题后重新迁移

## 最佳实践

1. **渐进式迁移** - 一次迁移一个模块
2. **保持测试通过** - 每次迁移后确保测试通过
3. **代码审查** - 迁移代码需要经过审查
4. **文档更新** - 及时更新文档

## 注意事项

1. **不要一次性迁移所有代码** - 分阶段进行
2. **保持API兼容性** - 迁移过程中不要破坏现有API
3. **性能考虑** - 关注迁移后的性能表现
4. **团队协作** - 确保团队成员了解新架构
