# Next.js 16+ 全栈框架

一个现代化的前后端分离全栈框架，使用 Next.js 16+、PostgreSQL 和 Redis 构建。

## 🚀 技术栈

### 前端
- **Next.js 16.2.4** - React 框架（App Router）
- **React 19.2.4** - UI 库
- **TypeScript 5** - 类型安全
- **TailwindCSS 4** - CSS 框架
- **Zustand** - 轻量状态管理
- **TanStack Query** - 数据获取与缓存

### 后端
- **Next.js API Routes** - RESTful API
- **Prisma 6** - ORM
- **ioredis** - Redis 客户端
- **Zod** - 数据验证

### 数据库
- **PostgreSQL** - 主数据存储
- **Redis** - 缓存、会话、队列

## 📁 项目结构

```
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API 路由
│   │   │   └── posts/        # 文章 API 示例
│   │   └── page.tsx          # 主页
│   ├── components/           # UI 组件
│   ├── lib/                  # 工具函数
│   │   ├── api.ts           # API 客户端
│   │   ├── prisma.ts        # Prisma 客户端
│   │   └── redis.ts         # Redis 客户端
│   ├── server/              # 后端代码
│   │   ├── api/            # API 路由逻辑
│   │   ├── services/       # 业务逻辑
│   │   ├── models/         # 数据模型
│   │   └── db/             # 数据库连接
│   └── types/              # TypeScript 类型
├── .env.example            # 环境变量模板
└── package.json
```

## 🛠️ 快速开始

### 1. 环境要求

- Node.js 20+
- PostgreSQL 14+
- Redis 7+

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 到 `.env` 并填写配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
REDIS_HOST="localhost"
REDIS_PORT=6379
REDIS_PASSWORD=""
```

### 4. 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# (可选) 填充示例数据
npx prisma db seed
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📚 API 文档

### 文章 API

#### 获取所有文章
```http
GET /api/posts
```

#### 创建文章
```http
POST /api/posts
Content-Type: application/json

{
  "title": "文章标题",
  "content": "文章内容",
  "authorId": "用户ID",
  "published": false
}
```

#### 获取单个文章
```http
GET /api/posts/{id}
```

#### 更新文章
```http
PATCH /api/posts/{id}
Content-Type: application/json

{
  "title": "更新后的标题",
  "published": true
}
```

#### 删除文章
```http
DELETE /api/posts/{id}
```

## 🔧 开发指南

### 数据库模型

在 `prisma/schema.prisma` 中定义模型：

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
}
```

运行迁移：

```bash
npx prisma migrate dev --name add_new_model
```

### 创建 API 路由

在 `src/app/api/` 下创建新路由：

```typescript
// src/app/api/users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json({ success: true, data: users })
}
```

### 使用 Redis 缓存

```typescript
import { cache } from '@/lib/redis'

// 设置缓存
await cache.set('key', data, 300) // 5分钟过期

// 获取缓存
const data = await cache.get('key')

// 删除缓存
await cache.del('key')
```

## 🧪 测试

```bash
# 运行测试
npm test

# 运行 E2E 测试
npm run test:e2e
```

## 📦 构建

```bash
# 生产构建
npm run build

# 启动生产服务器
npm start
```

## 🚀 部署

### Vercel (推荐)

1. Fork 本仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署！

### Docker

```bash
docker build -t nextjs-fullstack .
docker run -p 3000:3000 --env-file .env nextjs-fullstack
```

## 📝 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题，请提交 Issue 或联系项目维护者。

---

**Built with ❤️ using Next.js 16+**
