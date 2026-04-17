# 目录结构说明

## 项目根目录

```
agent-fleet-test/
├── docs/                          # 项目文档
│   ├── ARCHITECTURE.md            # 架构设计文档
│   ├── MIGRATION.md               # 迁移指南
│   └── STRUCTURE.md               # 本文档
├── prisma/                        # 数据库模型
│   └── schema.prisma
├── public/                        # 静态资源
├── src/                           # 源代码
│   ├── frontend/                  # 前端应用
│   ├── backend/                   # 后端服务
│   ├── shared/                    # 共享代码
│   └── app/                       # Next.js App Router
├── tests/                         # 测试文件
├── .env.example                   # 环境变量模板
├── next.config.ts                 # Next.js配置
├── package.json                   # 项目依赖
├── tsconfig.json                  # TypeScript配置
└── README.md                      # 项目说明
```

## 前端目录结构（src/frontend/）

```
src/frontend/
├── modules/                      # 业务模块
│   ├── home/                    # 首页模块
│   │   ├── components/          # 模块组件
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   └── index.ts
│   │   ├── hooks/              # 模块hooks
│   │   │   ├── useHomePage.ts
│   │   │   └── index.ts
│   │   ├── services/           # API调用
│   │   │   ├── homeApi.ts
│   │   │   └── index.ts
│   │   ├── types/              # 类型定义
│   │   │   └── index.ts
│   │   └── index.ts            # 模块导出
│   │
│   ├── posts/                   # 文章模块
│   │   ├── components/
│   │   │   ├── PostList.tsx
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostForm.tsx
│   │   │   ├── PostDetail.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── usePosts.ts
│   │   │   ├── usePost.ts
│   │   │   ├── useCreatePost.ts
│   │   │   ├── useUpdatePost.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── postsApi.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── auth/                    # 认证模块
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useLogin.ts
│   │   │   ├── useRegister.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── authApi.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── user/                    # 用户模块
│       ├── components/
│       │   ├── UserProfile.tsx
│       │   ├── UserSettings.tsx
│       │   └── index.ts
│       ├── hooks/
│       │   ├── useUser.ts
│       │   └── index.ts
│       ├── services/
│       │   ├── userApi.ts
│       │   └── index.ts
│       ├── types/
│       │   └── index.ts
│       └── index.ts
│
├── shared/                      # 前端共享资源
│   ├── components/              # 通用组件
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   ├── Input.test.tsx
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   ├── Loading/
│   │   │   ├── Loading.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── hooks/                  # 通用hooks
│   │   ├── useApi.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useMediaQuery.ts
│   │   └── index.ts
│   │
│   ├── utils/                  # 工具函数
│   │   ├── format.ts           # 格式化函数
│   │   ├── validation.ts       # 验证函数
│   │   ├── date.ts             # 日期函数
│   │   └── index.ts
│   │
│   ├── types/                  # 共享类型
│   │   ├── api.ts
│   │   ├── common.ts
│   │   └── index.ts
│   │
│   └── store/                  # 全局状态
│       ├── authStore.ts
│       ├── userStore.ts
│       └── index.ts
│
└── app/                         # Next.js应用入口
    ├── layout.tsx              # 根布局
    ├── page.tsx                # 首页
    ├── globals.css             # 全局样式
    ├── posts/                  # 文章路由
    │   ├── page.tsx
    │   └── [id]/
    │       └── page.tsx
    ├── auth/                   # 认证路由
    │   ├── login/
    │   │   └── page.tsx
    │   └── register/
    │       └── page.tsx
    └── user/                   # 用户路由
        └── profile/
            └── page.tsx
```

## 后端目录结构（src/backend/）

```
src/backend/
├── modules/                     # 业务服务模块
│   ├── posts/                  # 文章服务
│   │   ├── services/          # 业务逻辑
│   │   │   ├── PostService.ts
│   │   │   └── index.ts
│   │   ├── controllers/       # 控制器
│   │   │   ├── PostController.ts
│   │   │   └── index.ts
│   │   ├── dto/               # 数据传输对象
│   │   │   ├── CreatePostDto.ts
│   │   │   ├── UpdatePostDto.ts
│   │   │   └── index.ts
│   │   ├── validators/        # 验证器
│   │   │   ├── postValidators.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── auth/                   # 认证服务
│   │   ├── services/
│   │   │   ├── AuthService.ts
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   └── index.ts
│   │   ├── dto/
│   │   │   ├── LoginDto.ts
│   │   │   ├── RegisterDto.ts
│   │   │   └── index.ts
│   │   ├── validators/
│   │   │   └── authValidators.ts
│   │   └── index.ts
│   │
│   └── user/                   # 用户服务
│       ├── services/
│       │   ├── UserService.ts
│       │   └── index.ts
│       ├── controllers/
│       │   ├── UserController.ts
│       │   └── index.ts
│       ├── dto/
│       │   └── index.ts
│       ├── validators/
│       │   └── index.ts
│       └── index.ts
│
├── shared/                     # 后端共享资源
│   ├── services/              # 通用服务
│   │   ├── CacheService.ts    # 缓存服务
│   │   ├── QueueService.ts    # 队列服务
│   │   └── index.ts
│   │
│   ├── middleware/            # 中间件
│   │   ├── authMiddleware.ts  # 认证中间件
│   │   ├── errorMiddleware.ts # 错误处理中间件
│   │   ├── validationMiddleware.ts # 验证中间件
│   │   └── index.ts
│   │
│   ├── utils/                 # 工具函数
│   │   ├── crypto.ts          # 加密工具
│   │   ├── logger.ts          # 日志工具
│   │   ├── token.ts           # Token工具
│   │   └── index.ts
│   │
│   ├── database/              # 数据库
│   │   ├── prisma.ts          # Prisma客户端
│   │   ├── redis.ts           # Redis客户端
│   │   └── index.ts
│   │
│   └── types/                 # 共享类型
│       ├── api.ts
│       └── index.ts
│
└── api/                        # API路由入口
    ├── posts/
    │   ├── route.ts
    │   └── [id]/
    │       └── route.ts
    ├── auth/
    │   ├── login/
    │   │   └── route.ts
    │   └── register/
    │       └── route.ts
    └── users/
        └── route.ts
```

## 共享目录结构（src/shared/）

```
src/shared/
├── types/                       # 共享类型定义
│   ├── post.ts                 # 文章类型
│   ├── user.ts                 # 用户类型
│   ├── auth.ts                 # 认证类型
│   └── index.ts
│
├── constants/                   # 共享常量
│   ├── errors.ts               # 错误常量
│   ├── status.ts               # 状态常量
│   └── index.ts
│
└── utils/                       # 共享工具
    ├── format.ts
    ├── validation.ts
    └── index.ts
```

## 文件命名规范

### 组件文件
- 使用PascalCase命名
- 导出使用默认导出
- 示例：`Button.tsx`, `PostList.tsx`

### Hooks文件
- 使用camelCase命名，前缀为`use`
- 导出使用命名导出
- 示例：`useAuth.ts`, `usePosts.ts`

### 服务文件
- 使用PascalCase命名，后缀为`Service`或`Api`
- 导出使用命名导出或类导出
- 示例：`AuthService.ts`, `postsApi.ts`

### 类型文件
- 使用PascalCase命名，后缀为`Dto`
- 示例：`CreatePostDto.ts`, `LoginDto.ts`

### 工具文件
- 使用camelCase命名
- 示例：`format.ts`, `validation.ts`

## 导入规范

### 从模块导入
```typescript
// 从特定模块导入
import { PostList } from '@/frontend/modules/posts'
import { useAuth } from '@/frontend/modules/auth/hooks'

// 从共享组件导入
import { Button } from '@/frontend/shared/components/Button'
```

### 从后端导入
```typescript
// 从后端服务导入
import { postService } from '@/backend/modules/posts/services'
import { authMiddleware } from '@/backend/shared/middleware'
```

### 从共享代码导入
```typescript
// 从共享类型导入
import { Post, User } from '@/shared/types'
```

## 目录组织原则

### 1. 按功能组织
- 每个模块代表一个完整的业务功能
- 模块内部包含该功能所需的所有代码

### 2. 按层次组织
- 组件层：UI组件
- Hooks层：状态管理和副作用
- 服务层：API调用
- 类型层：类型定义

### 3. 按职责组织
- 前端负责UI和用户交互
- 后端负责业务逻辑和数据处理
- 共享代码负责前后端通用的功能

## 模块独立性

每个模块应该：
1. **独立开发** - 可以独立开发而不影响其他模块
2. **独立测试** - 可以独立测试模块功能
3. **独立部署** - 理论上可以独立部署（微服务化）

## 扩展指南

### 添加新前端模块

1. 在`src/frontend/modules/`下创建新目录
2. 创建`components/`, `hooks/`, `services/`, `types/`子目录
3. 在各子目录中创建相应文件
4. 在模块根目录创建`index.ts`导出文件

### 添加新后端服务

1. 在`src/backend/modules/`下创建新目录
2. 创建`services/`, `controllers/`, `dto/`, `validators/`子目录
3. 在各子目录中创建相应文件
4. 在`src/app/api/`下创建对应的路由文件

### 添加共享类型

1. 在`src/shared/types/`下创建新文件
2. 定义共享的类型
3. 在`src/shared/types/index.ts`中导出
