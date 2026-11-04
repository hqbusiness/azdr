import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { businesses: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error("Error al obtener categorías:", error);
    return NextResponse.json({ error: "Error al cargar categorías." }, { status: 500 });
  }
}
