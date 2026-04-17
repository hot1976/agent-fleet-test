'use client'

import { useEffect, useState } from 'react'
import { postsApi } from '@/lib/api'
import type { Post } from '@/types'

// 统计卡片组件
interface StatCardProps {
  title: string
  value: string | number
  change: string
  trend: 'up' | 'down' | 'neutral'
  icon: string
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="text-3xl">{icon}</div>
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'up'
                ? 'text-teal-400'
                : trend === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
            }`}
          >
            <svg
              className={`w-4 h-4 ${
                trend === 'down' ? 'rotate-180' : ''
              } transition-transform duration-200`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            {change}
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          <p className="text-sm text-slate-400">{title}</p>
        </div>
      </div>
    </div>
  )
}

// 文章列表项组件
function PostItem({ post }: { post: Post & { author?: { name?: string; email: string } } }) {
  return (
    <div className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-xl p-5 hover:border-slate-700/50 transition-all duration-300 cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors duration-200 line-clamp-1">
            {post.title}
          </h3>
          <span
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
              post.published
                ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}
          >
            {post.published ? '已发布' : '草稿'}
          </span>
        </div>
        {post.content && (
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">
            {post.content}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-medium text-xs">
              {(post.author?.name || post.author?.email || 'U')[0].toUpperCase()}
            </div>
            <span>{post.author?.name || post.author?.email || '未知作者'}</span>
          </div>
          <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
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

  const stats = [
    { title: '总文章数', value: posts.length, change: '+12%', trend: 'up' as const, icon: '📝' },
    { title: '已发布', value: posts.filter(p => p.published).length, change: '+8%', trend: 'up' as const, icon: '✅' },
    { title: '草稿', value: posts.filter(p => !p.published).length, change: '-3%', trend: 'down' as const, icon: '📄' },
    { title: '总浏览量', value: '2.4K', change: '+15%', trend: 'up' as const, icon: '👁️' },
  ]

  return (
    <div className="space-y-8">
      {/* 欢迎横幅 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-teal-500/20 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 animate-pulse" />
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-2">
            欢迎回来! 👋
          </h1>
          <p className="text-slate-400">
            这是您的全栈框架仪表盘，查看最近的活动和统计数据。
          </p>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* 文章列表 */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">最近文章</h2>
            <p className="text-sm text-slate-400">查看和管理您的文章内容</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40">
            查看全部
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
              <p className="mt-3 text-sm text-slate-400">加载中...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📝</div>
            <p className="text-slate-400 mb-4">暂无文章</p>
            <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium text-sm">
              创建第一篇文章
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.slice(0, 5).map((post: any) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300 text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-3xl mb-3">✍️</div>
            <h3 className="text-lg font-semibold text-white mb-1">写文章</h3>
            <p className="text-sm text-slate-400">创建新的博客文章</p>
          </div>
        </button>

        <button className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300 text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-white mb-1">查看分析</h3>
            <p className="text-sm text-slate-400">了解您的数据表现</p>
          </div>
        </button>

        <button className="group relative bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl p-6 hover:border-slate-700/50 transition-all duration-300 text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-lg font-semibold text-white mb-1">系统设置</h3>
            <p className="text-sm text-slate-400">管理您的偏好设置</p>
          </div>
        </button>
      </div>
    </div>
  )
}
