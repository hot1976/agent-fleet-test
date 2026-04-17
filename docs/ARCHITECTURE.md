# 前后端分离架构设计

## 架构原则

1. **前后端完全分离** - 前端和后端代码在物理目录上完全隔离
2. **模块化设计** - 前端按业务模块组织，后端按服务模块组织
3. **职责清晰** - 每个模块有明确的职责边界
4. **易于维护** - 目录结构清晰，便于团队协作和代码维护

## 目录结构

```
src/
├── frontend/                          # 前端应用
│   ├── modules/                      # 业务模块（按功能划分）
│   │   ├── home/                    # 首页模块
│   │   │   ├── components/          # 模块专属组件
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   └── FeatureCard.tsx
│   │   │   ├── hooks/              # 模块专属hooks
│   │   │   │   └── useHomePage.ts
│   │   │   ├── services/           # 模块API调用
│   │   │   │   └── homeApi.ts
│   │   │   ├── types/              # 模块类型定义
│   │   │   │   └── index.ts
│   │   │   └── index.ts            # 模块导出
│   │   │
│   │   ├── posts/                   # 文章模块
│   │   │   ├── components/
│   │   │   │   ├── PostList.tsx
│   │   │   │   ├── PostCard.tsx
│   │   │   │   └── PostForm.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── usePosts.ts
│   │   │   │   └── usePost.ts
│   │   │   ├── services/
│   │   │   │   └── postsApi.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                    # 认证模块
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authApi.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── user/                    # 用户模块
│   │       ├── components/
│   │       │   ├── UserProfile.tsx
│   │       │   └── UserSettings.tsx
│   │       ├── hooks/
│   │       │   └── useUser.ts
│   │       ├── services/
│   │       │   └── userApi.ts
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── shared/                      # 前端共享资源
│   │   ├── components/              # 通用UI组件
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── hooks/                  # 通用hooks
│   │   │   ├── useApi.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useLocalStorage.ts
│   │   ├── utils/                  # 工具函数
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── date.ts
│   │   ├── types/                  # 共享类型
│   │   │   ├── api.ts
│   │   │   └── common.ts
│   │   └── store/                  # 全局状态管理
│   │       ├── authStore.ts
│   │       └── index.ts
│   │
│   └── app/                         # Next.js应用入口（仅路由）
│       ├── layout.tsx              # 根布局
│       ├── page.tsx                # 首页
│       ├── globals.css             # 全局样式
│       ├── posts/                  # 文章页面
│       │   ├── page.tsx
│       │   └── [id]/
│       │       └── page.tsx
│       └── auth/                   # 认证页面
│           ├── login/
│           │   └── page.tsx
│           └── register/
│               └── page.tsx
│
├── backend/                          # 后端服务
│   ├── modules/                     # 业务服务模块
│   │   ├── posts/                  # 文章服务
│   │   │   ├── services/          # 业务逻辑
│   │   │   │   ├── PostService.ts
│   │   │   │   └── index.ts
│   │   │   ├── controllers/       # 控制器（路由处理）
│   │   │   │   ├── PostController.ts
│   │   │   │   └── index.ts
│   │   │   ├── dto/               # 数据传输对象
│   │   │   │   ├── CreatePostDto.ts
│   │   │   │   ├── UpdatePostDto.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/        # 请求验证
│   │   │   │   ├── postValidators.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/                   # 认证服务
│   │   │   ├── services/
│   │   │   │   ├── AuthService.ts
│   │   │   │   └── index.ts
│   │   │   ├── controllers/
│   │   │   │   ├── AuthController.ts
│   │   │   │   └── index.ts
│   │   │   ├── dto/
│   │   │   │   ├── LoginDto.ts
│   │   │   │   ├── RegisterDto.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   └── authValidators.ts
│   │   │   └── index.ts
│   │   │
│   │   └── user/                   # 用户服务
│   │       ├── services/
│   │       │   ├── UserService.ts
│   │       │   └── index.ts
│   │       ├── controllers/
│   │       │   ├── UserController.ts
│   │       │   └── index.ts
│   │       ├── dto/
│   │       │   └── index.ts
│   │       ├── validators/
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── shared/                     # 后端共享资源
│   │   ├── services/              # 通用服务
│   │   │   ├── CacheService.ts    # 缓存服务
│   │   │   ├── QueueService.ts    # 队列服务
│   │   │   └── index.ts
│   │   ├── middleware/            # 中间件
│   │   │   ├── authMiddleware.ts
│   │   │   ├── errorMiddleware.ts
│   │   │   ├── validationMiddleware.ts
│   │   │   └── index.ts
│   │   ├── utils/                 # 工具函数
│   │   │   ├── crypto.ts
│   │   │   ├── logger.ts
│   │   │   └── index.ts
│   │   ├── database/              # 数据库
│   │   │   ├── prisma.ts
│   │   │   ├── redis.ts
│   │   │   └── index.ts
│   │   └── types/                 # 共享类型
│   │       ├── api.ts
│   │       └── index.ts
│   │
│   └── api/                        # API路由入口（Next.js API Routes）
│       ├── posts/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       ├── auth/
│       │   ├── login/
│       │   │   └── route.ts
│       │   └── register/
│       │       └── route.ts
│       └── users/
│           └── route.ts
│
└── shared/                          # 前后端共享
    ├── types/                       # 共享类型定义
    │   ├── post.ts
    │   ├── user.ts
    │   └── index.ts
    ├── constants/                   # 共享常量
    │   ├── errors.ts
    │   └── index.ts
    └── utils/                       # 共享工具
        └── index.ts
```

## 架构说明

### 前端架构（frontend/）

#### 1. 模块化组织（modules/）
- 每个业务模块都是独立的，包含自己的组件、hooks、services和types
- 模块之间通过明确的API接口通信
- 模块内部高内聚，模块之间低耦合

#### 2. 共享资源（shared/）
- 通用组件可被所有模块复用
- 通用hooks提供常用的前端逻辑
- 工具函数提供纯函数式的数据处理

#### 3. 应用入口（app/）
- 仅负责路由和页面组合
- 不包含复杂业务逻辑
- 使用modules中的组件和hooks

### 后端架构（backend/）

#### 1. 服务模块化（modules/）
- 每个业务服务包含完整的业务逻辑
- services层处理业务逻辑
- controllers层处理HTTP请求
- dto层定义数据传输对象
- validators层处理请求验证

#### 2. 共享资源（shared/）
- 通用服务（缓存、队列等）
- 中间件（认证、错误处理、验证）
- 数据库连接（Prisma、Redis）
- 工具函数和类型定义

#### 3. API路由（api/）
- 仅作为HTTP入口
- 委托给对应的controller处理
- 不包含业务逻辑

### 共享资源（shared/）
- 前后端共享的类型定义
- 共享的常量定义
- 共享的工具函数

## 模块划分原则

### 前端模块划分
1. **按业务功能划分** - 每个模块对应一个业务功能
2. **按用户角色划分** - 不同用户角色的功能可以独立成模块
3. **按页面划分** - 大型页面可以独立成模块

### 后端服务划分
1. **按业务领域划分** - 每个服务对应一个业务领域
2. **按数据实体划分** - 核心数据实体对应独立服务
3. **按业务能力划分** - 不同的业务能力对应独立服务

## 数据流向

### 前端数据流
```
用户操作 → UI组件 → Hook → Service → API → 后端
```

### 后端数据流
```
API请求 → Controller → Validator → Service → Database/Cache
```

## 优势

1. **清晰的职责分离** - 前后端职责明确，便于团队协作
2. **模块独立性** - 每个模块可以独立开发、测试和维护
3. **可扩展性** - 新增功能只需添加新模块，不影响现有代码
4. **可维护性** - 代码组织清晰，易于定位和修改
5. **可测试性** - 每个模块可以独立测试

## 迁移建议

1. **渐进式迁移** - 逐步将现有代码迁移到新架构
2. **保持兼容** - 在迁移过程中保持现有API的兼容性
3. **模块优先** - 优先创建新模块，旧代码逐步重构
4. **测试覆盖** - 确保迁移过程中有充分的测试覆盖

## 开发规范

1. **模块导入** - 模块之间通过index.ts统一导出
2. **类型安全** - 所有模块都使用TypeScript类型
3. **错误处理** - 统一的错误处理机制
4. **代码风格** - 统一的代码风格和命名规范
