import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cache } from '@/lib/redis'
import { z } from 'zod'

// 验证 schema
const createPostSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().optional(),
  authorId: z.string().min(1, '作者ID不能为空'),
  published: z.boolean().default(false),
})

// GET /api/posts - 获取所有文章列表
export async function GET() {
  try {
    // 尝试从缓存获取
    const cachedPosts = await cache.get('posts:all')
    if (cachedPosts) {
      return NextResponse.json({
        success: true,
        data: cachedPosts,
        cached: true,
      })
    }

    // 从数据库查询
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // 设置缓存（5分钟）
    await cache.set('posts:all', posts, 300)

    return NextResponse.json({
      success: true,
      data: posts,
      cached: false,
    })
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '获取文章列表失败',
      },
      { status: 500 }
    )
  }
}

// POST /api/posts - 创建新文章
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = createPostSchema.parse(body)

    const post = await prisma.post.create({
      data: validatedData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    // 清除缓存
    await cache.del('posts:all')

    return NextResponse.json(
      {
        success: true,
        data: post,
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: '数据验证失败',
          details: (error as z.ZodError).issues,
        },
        { status: 400 }
      )
    }

    console.error('创建文章失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '创建文章失败',
      },
      { status: 500 }
    )
  }
}
