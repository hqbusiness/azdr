import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Search by slug first, fallback to id
    const business = await prisma.business.findFirst({
      where: {
        OR: [{ slug: id }, { id: id }],
      },
      include: {
        category: true,
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    if (!business) {
      return NextResponse.json({ error: "Negocio no encontrado." }, { status: 404 });
    }

    return NextResponse.json({ business });
  } catch (error: any) {
    console.error("Error al obtener detalle del negocio:", error);
    return NextResponse.json({ error: "Error al cargar el negocio." }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const { id } = params;
    const existing = await prisma.business.findFirst({
      where: { OR: [{ slug: id }, { id: id }] },
    });

    if (!existing) {
      return NextResponse.json({ error: "Negocio no encontrado." }, { status: 404 });
    }

    // Verify ownership
    if (existing.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "No tiene permiso para editar este negocio." }, { status: 403 });
    }

    const body = await request.json();

    const updated = await prisma.business.update({
      where: { id: existing.id },
      data: {
        name: body.name !== undefined ? body.name.trim() : existing.name,
        description: body.description !== undefined ? body.description.trim() : existing.description,
        shortDescription: body.shortDescription !== undefined ? body.shortDescription.trim() : existing.shortDescription,
        categoryId: body.categoryId || existing.categoryId,
        country: body.country || existing.country,
        countryCode: body.countryCode || existing.countryCode,
        city: body.city || existing.city,
        address: body.address !== undefined ? body.address.trim() : existing.address,
        latitude: body.latitude !== undefined ? parseFloat(body.latitude) : existing.latitude,
        longitude: body.longitude !== undefined ? parseFloat(body.longitude) : existing.longitude,
        whatsapp: body.whatsapp !== undefined ? body.whatsapp.trim() : existing.whatsapp,
        phone: body.phone !== undefined ? body.phone.trim() : existing.phone,
        email: body.email !== undefined ? body.email.trim() : existing.email,
        website: body.website !== undefined ? body.website.trim() : existing.website,
        instagram: body.instagram !== undefined ? body.instagram.trim() : existing.instagram,
        facebook: body.facebook !== undefined ? body.facebook.trim() : existing.facebook,
        linkedin: body.linkedin !== undefined ? body.linkedin.trim() : existing.linkedin,
        schedule: body.schedule !== undefined ? body.schedule.trim() : existing.schedule,
        logoUrl: body.logoUrl !== undefined ? body.logoUrl.trim() : existing.logoUrl,
        bannerUrl: body.bannerUrl !== undefined ? body.bannerUrl.trim() : existing.bannerUrl,
      },
    });

    return NextResponse.json({ success: true, business: updated });
  } catch (error: any) {
    console.error("Error al actualizar negocio:", error);
    return NextResponse.json({ error: "Error al actualizar el negocio." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    const { id } = params;
    const existing = await prisma.business.findFirst({
      where: { OR: [{ slug: id }, { id: id }] },
    });

    if (!existing) {
      return NextResponse.json({ error: "Negocio no encontrado." }, { status: 404 });
    }

    if (existing.userId !== user.id && user.role !== "ADMIN") {
      return NextResponse.json({ error: "No tiene permiso para eliminar este negocio." }, { status: 403 });
    }

    await prisma.business.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true, message: "Negocio eliminado exitosamente." });
  } catch (error: any) {
    console.error("Error al eliminar negocio:", error);
    return NextResponse.json({ error: "Error al eliminar el negocio." }, { status: 500 });
  }
}
