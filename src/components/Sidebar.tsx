'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

const navItems: NavItem[] = [
  { label: '首页', href: '/', icon: '🏠' },
  { label: '文章管理', href: '/posts', icon: '📝' },
  { label: '用户管理', href: '/users', icon: '👥' },
  { label: '数据分析', href: '/analytics', icon: '📊' },
  { label: '设置', href: '/settings', icon: '⚙️' },
]

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-slate-900/50 backdrop-blur-xl border-r border-slate-800/50 transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
      style={{
        boxShadow: collapsed
          ? '4px 0 24px rgba(0, 0, 0, 0.3)'
          : '4px 0 24px rgba(0, 0, 0, 0.4)',
      }}
    >
      {/* Logo 区域 */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span className="text-white font-semibold text-lg">FullStack</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-all duration-200 group"
          style={{
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <svg
            className="w-5 h-5 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* 导航菜单 */}
      <nav className="p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const isHovered = hoveredItem === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              {/* 活动指示器 */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-r-full" />
              )}

              {/* 悬停效果 */}
              {isHovered && !isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}

              {/* 图标 */}
              <span className="text-xl flex-shrink-0">{item.icon}</span>

              {/* 标签 */}
              {!collapsed && (
                <span className="flex-1 font-medium">{item.label}</span>
              )}

              {/* 徽章 */}
              {!collapsed && item.badge && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* 底部用户信息 */}
      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800/50">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                用户名
              </p>
              <p className="text-xs text-slate-400 truncate">
                user@example.com
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
