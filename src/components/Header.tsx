'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="h-16 bg-slate-900/30 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-6">
      {/* 左侧：搜索框 */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div
          className={`relative transition-all duration-300 ${
            searchFocused ? 'w-96' : 'w-80'
          }`}
        >
          <input
            type="text"
            placeholder="搜索..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className={`w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg px-4 py-2 pl-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all duration-200 ${
              searchFocused ? 'ring-2 ring-teal-500/50 border-teal-500/50' : ''
            }`}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* 右侧：操作按钮 */}
      <div className="flex items-center gap-3">
        {/* 通知按钮 */}
        <button className="relative p-2.5 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all duration-200 group">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" />
        </button>

        {/* 文档按钮 */}
        <Link
          href="/docs"
          className="p-2.5 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </Link>

        {/* 分隔线 */}
        <div className="w-px h-6 bg-slate-700/50 mx-1" />

        {/* 新建按钮 */}
        <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40">
          新建
        </button>
      </div>
    </header>
  )
}
