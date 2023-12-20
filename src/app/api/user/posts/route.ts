import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { title, slug, short_Desc, content, image } = body;
    const posts = await prismadb.posts.create({
      data: {
        title,
        slug,
        short_Desc,
        content,
        image,
        userId: currentUser?.id as string,
      },
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
