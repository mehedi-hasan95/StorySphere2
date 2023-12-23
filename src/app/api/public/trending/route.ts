import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const posts = await prismadb.posts.findMany({
      where: {
        createdAt: {
          equals: new Date(new Date().setDate(new Date().getDate() - 365)),
        },
      },

      orderBy: {
        views: "desc",
      },
      take: 6,
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
    return NextResponse.json({ msg: "fail", error });
  }
}
