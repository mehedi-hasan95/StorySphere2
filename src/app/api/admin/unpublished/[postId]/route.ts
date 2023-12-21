import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser?.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize user", status: 401 });
    }

    const posts = await prismadb.posts.findUnique({
      where: {
        id: params.postId,
      },
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser?.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize user", status: 401 });
    }
    const body = await req.json();
    const posts = await prismadb.posts.update({
      where: {
        id: params.postId,
      },
      data: {
        verifide: body.verifide,
      },
    });
    return NextResponse.json({ msg: "success", posts }, { status: 200 });
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
    if (currentUser?.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorize user", status: 401 });
    }
    const posts = await prismadb.posts.findUnique({
      where: {
        id: params.postId,
      },
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
