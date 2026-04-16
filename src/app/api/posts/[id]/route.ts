import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cache } from '@/lib/redis'
import { z } from 'zod'

// 验证 schema
const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
})

// GET /api/posts/[id] - 获取单个文章
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // 尝试从缓存获取
    const cachedPost = await cache.get(`post:${id}`)
    if (cachedPost) {
      return NextResponse.json({
        success: true,
        data: cachedPost,
        cached: true,
      })
    }

    const post = await prisma.post.findUnique({
      where: { id },
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

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          error: '文章不存在',
        },
        { status: 404 }
      )
    }

    // 设置缓存（10分钟）
    await cache.set(`post:${id}`, post, 600)

    return NextResponse.json({
      success: true,
      data: post,
      cached: false,
    })
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '获取文章失败',
      },
      { status: 500 }
    )
  }
}

// PATCH /api/posts/[id] - 更新文章
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updatePostSchema.parse(body)

    const post = await prisma.post.update({
      where: { id },
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

    // 清除相关缓存
    await cache.del(`post:${id}`)
    await cache.del('posts:all')

    return NextResponse.json({
      success: true,
      data: post,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: '数据验证失败',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    console.error('更新文章失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '更新文章失败',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/posts/[id] - 删除文章
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.post.delete({
      where: { id },
    })

    // 清除相关缓存
    await cache.del(`post:${id}`)
    await cache.del('posts:all')

    return NextResponse.json({
      success: true,
      message: '文章已删除',
    })
  } catch (error) {
    console.error('删除文章失败:', error)
    return NextResponse.json(
      {
        success: false,
        error: '删除文章失败',
      },
      { status: 500 }
    )
  }
}
