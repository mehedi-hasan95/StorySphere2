import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ msg: "unauthorize", status: 401 });
    }
    const body = await req.json();
    const { productId } = body;
    const like = await prismadb.postLike.create({
      data: {
        productId: productId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json({ msg: "success", like });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { likeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ msg: "unauthorize", status: 401 });
    }
    const like = await prismadb.postLike.delete({
      where: {
        id: params.likeId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json({ msg: "success", like });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { likeId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const like = await prismadb.postLike.findFirst({
      where: {
        productId: params.likeId,
        userId: currentUser?.id,
      },
    });
    return NextResponse.json({ msg: "success", like });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}
