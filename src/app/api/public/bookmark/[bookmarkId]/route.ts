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
    const bookmark = await prismadb.wishlist.create({
      data: {
        productId: productId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json({ msg: "success", bookmark });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return NextResponse.json({ msg: "unauthorize", status: 401 });
    }
    const bookmark = await prismadb.wishlist.delete({
      where: {
        id: params.bookmarkId,
        userId: currentUser.id,
      },
    });
    return NextResponse.json({ msg: "success", bookmark });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const bookmark = await prismadb.wishlist.findFirst({
      where: {
        productId: params.bookmarkId,
        userId: currentUser?.id,
      },
    });
    return NextResponse.json({ msg: "success", bookmark });
  } catch (error) {
    return NextResponse.json({ msg: "fail", error });
  }
}
