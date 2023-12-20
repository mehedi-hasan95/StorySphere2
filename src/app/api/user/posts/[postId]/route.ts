import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const authorizeUser = await prismadb.posts.findUnique({
      where: {
        id: params.postId,
      },
    });
    if (authorizeUser?.userId !== currentUser?.id) {
      return NextResponse.json({ msg: "UnAuthorize User", status: 401 });
    }
    const posts = await prismadb.posts.update({
      where: {
        id: params.postId,
      },
      data: body,
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const authorizeUser = await prismadb.posts.findUnique({
      where: {
        id: params.postId,
      },
    });
    if (authorizeUser?.userId !== currentUser?.id) {
      return NextResponse.json({ msg: "UnAuthorize User", status: 401 });
    }
    const posts = await prismadb.posts.delete({
      where: {
        id: authorizeUser?.id,
      },
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
