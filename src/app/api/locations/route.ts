import { NextResponse } from "next/server";
import { LATAM_COUNTRIES } from "@/data/locations";

export async function GET() {
  return NextResponse.json({ countries: LATAM_COUNTRIES });
}
