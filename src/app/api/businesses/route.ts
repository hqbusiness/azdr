import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// Helper to generate URL slug
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const categoria = searchParams.get("categoria") || "";
    const pais = searchParams.get("pais") || "";
    const ciudad = searchParams.get("ciudad") || "";
    const destacado = searchParams.get("destacado");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { shortDescription: { contains: search } },
        { city: { contains: search } },
        { address: { contains: search } },
      ];
    }

    if (categoria) {
      where.category = {
        slug: categoria,
      };
    }

    if (pais) {
      where.country = pais;
    }

    if (ciudad) {
      where.city = ciudad;
    }

    if (destacado === "true") {
      where.featured = true;
    }

    const [businesses, total] = await Promise.all([
      prisma.business.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true, icon: true, color: true },
          },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: limit,
        skip: skip,
      }),
      prisma.business.count({ where }),
    ]);

    return NextResponse.json({
      businesses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error al obtener negocios:", error);
    return NextResponse.json(
      { error: "Error al cargar la lista de negocios." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Debe iniciar sesión para publicar un negocio." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      categoryId,
      country,
      countryCode,
      city,
      address,
      latitude,
      longitude,
      whatsapp,
      phone,
      email,
      website,
      instagram,
      facebook,
      linkedin,
      schedule,
      description,
      shortDescription,
      logoUrl,
      bannerUrl,
    } = body;

    // Validation
    if (!name || !categoryId || !country || !city || !address || !whatsapp || !description) {
      return NextResponse.json(
        { error: "Por favor complete los campos obligatorios: Nombre, Categoría, País, Ciudad, Dirección, WhatsApp y Descripción." },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(`${name}-${city}`);
    let slug = baseSlug;
    let count = 1;
    while (await prisma.business.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    const business = await prisma.business.create({
      data: {
        slug,
        name: name.trim(),
        description: description.trim(),
        shortDescription: shortDescription?.trim() || description.trim().slice(0, 140),
        categoryId,
        country: country.trim(),
        countryCode: countryCode || "LATAM",
        city: city.trim(),
        address: address.trim(),
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        whatsapp: whatsapp.trim(),
        phone: phone?.trim() || null,
        email: email?.trim() || null,
        website: website?.trim() || null,
        instagram: instagram?.trim() || null,
        facebook: facebook?.trim() || null,
        linkedin: linkedin?.trim() || null,
        schedule: schedule?.trim() || null,
        logoUrl: logoUrl?.trim() || null,
        bannerUrl: bannerUrl?.trim() || null,
        userId: user.id,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ success: true, business }, { status: 201 });
  } catch (error: any) {
    console.error("Error al crear negocio:", error);
    return NextResponse.json(
      { error: "No se pudo registrar el negocio. Verifique los datos." },
      { status: 500 }
    );
  }
}
