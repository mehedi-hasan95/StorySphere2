import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prismadb.posts.update({
      where: {
        id: params.postId,
      },
      data: {
        views: { increment: 1 },
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            postComment: true,
            postLike: true,
            wishlist: true,
          },
        },
      },
    });
    return NextResponse.json({ msg: "success", post });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
