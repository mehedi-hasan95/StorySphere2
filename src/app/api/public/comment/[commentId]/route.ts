import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ msg: "unauthorize", status: 401 });
    }
    const body = await req.json();
    const { comment, productId } = body;
    const commentdata = await prismadb.postComment.create({
      data: {
        comment,
        productId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json({ msg: "success", commentdata });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { commentId: string } }
) {
  try {
    const comments = await prismadb.postComment.findMany({
      where: {
        productId: params.commentId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json({ msg: "success", comments });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}
