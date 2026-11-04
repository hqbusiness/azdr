import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  try {
    // Find or create demo user
    let user = await prisma.user.findUnique({
      where: { email: "demo@azdirectorio.com" },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: "demo@directoriolatam.com" },
      });
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: "demo@azdirectorio.com",
          name: "Propietario AZ Directorio",
          role: "ADMIN",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
        },
      });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      image: user.image,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        image: user.image,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error("Error en demo-login:", error);
    return NextResponse.json({ error: "Error en inicio demo" }, { status: 500 });
  }
}
