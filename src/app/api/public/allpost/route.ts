import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const posts = await prismadb.posts.findMany({
      where: {
        verifide: {
          equals: true,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
    return NextResponse.json({ msg: "success", posts });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
