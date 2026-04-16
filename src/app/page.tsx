'use client'

import { useEffect, useState } from 'react'
import { postsApi } from '@/lib/api'
import type { Post } from '@/types'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await postsApi.getAll()
        if (response.success && response.data) {
          setPosts(response.data)
        } else {
          setError(response.error || '获取文章失败')
        }
      } catch (err) {
        setError('网络请求失败')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-slate-600 dark:text-slate-400">加载中...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            全栈框架示例
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Next.js 16 + PostgreSQL + Redis
          </p>
        </header>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
              <p className="text-slate-600 dark:text-slate-400">暂无文章</p>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                {post.content && (
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
                  {post.author && (
                    <span className="font-medium">{post.author.name || post.author.email}</span>
                  )}
                  <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                </div>
                <div className="mt-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.published
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {post.published ? '已发布' : '草稿'}
                  </span>
                </div>
              </article>
            ))
          )}
        </div>

        {/* API 信息 */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            可用的 API 端点
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">GET /api/posts</code>
              <span className="text-slate-600 dark:text-slate-400">获取所有文章</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">POST /api/posts</code>
              <span className="text-slate-600 dark:text-slate-400">创建文章</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">GET /api/posts/[id]</code>
              <span className="text-slate-600 dark:text-slate-400">获取单个文章</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">PATCH /api/posts/[id]</code>
              <span className="text-slate-600 dark:text-slate-400">更新文章</span>
            </li>
            <li className="flex items-center gap-2">
              <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">DELETE /api/posts/[id]</code>
              <span className="text-slate-600 dark:text-slate-400">删除文章</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
