import { ApiResponse, Post } from '@/types'

const API_BASE = '/api'

// 通用 fetch 包装函数
async function fetcher<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('API request failed:', error)
    return {
      success: false,
      error: '网络请求失败',
    }
  }
}

// 文章 API
export const postsApi = {
  // 获取所有文章
  getAll: () => fetcher<Post[]>(`${API_BASE}/posts`),

  // 获取单个文章
  getById: (id: string) => fetcher<Post>(`${API_BASE}/posts/${id}`),

  // 创建文章
  create: (data: {
    title: string
    content?: string
    authorId: string
    published?: boolean
  }) =>
    fetcher<Post>(`${API_BASE}/posts`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // 更新文章
  update: (id: string, data: Partial<Post>) =>
    fetcher<Post>(`${API_BASE}/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // 删除文章
  delete: (id: string) =>
    fetcher(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
    }),
}
