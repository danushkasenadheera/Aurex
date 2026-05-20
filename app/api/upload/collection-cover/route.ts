import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { s3Put } from "@/lib/s3";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: staff } = await supabase.from("staff").select("id").eq("id", user.id).single();
  if (!staff) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const id = crypto.randomUUID();

  const processed = await sharp(buffer)
    .resize(800, 1000, { fit: "cover", position: "center" })
    .webp({ quality: 88 })
    .toBuffer();

  const url = await s3Put(`collection-covers/${id}.webp`, processed);

  return NextResponse.json({ urls: { cover: url } });
}
