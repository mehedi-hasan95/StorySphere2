import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // const currentUsre = await getCurrentUser();
    // if (currentUsre?.role !== "admin") {
    //   return NextResponse.json({ msg: "unauthorize user", status: 401 });
    // }
    const user = await prismadb.user.findMany({
      where: {
        role: {
          equals: "user",
        },
      },
    });
    return NextResponse.json({ msg: "success", user });
  } catch (error) {
    return NextResponse.json({ msg: "faill", error });
  }
}
