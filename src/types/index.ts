// API 响应类型
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  cached?: boolean
  details?: unknown
}

// 用户类型
export interface User {
  id: string
  email: string
  name?: string | null
  createdAt: Date
  updatedAt: Date
}

// 文章类型
export interface Post {
  id: string
  title: string
  content?: string | null
  published: boolean
  authorId: string
  createdAt: Date
  updatedAt: Date
  author?: {
    id: string
    name?: string | null
    email: string
  }
}

// 创建文章输入
export interface CreatePostInput {
  title: string
  content?: string
  authorId: string
  published?: boolean
}

// 更新文章输入
export interface UpdatePostInput {
  title?: string
  content?: string
  published?: boolean
}
