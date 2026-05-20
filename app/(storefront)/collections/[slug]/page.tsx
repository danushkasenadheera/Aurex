import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductCard from "@/components/storefront/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as unknown as any;
  const { data } = await sb.from("collections").select("name, description").eq("slug", slug).single();
  if (!data) return { title: "Collection Not Found" };
  return {
    title: `${data.name} — Auréx`,
    description: data.description || `Shop the ${data.name} collection at Auréx.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as unknown as any;

  const collectionRes = await sb
    .from("collections")
    .select("id, name, slug, description, cover_image_url")
    .eq("slug", slug)
    .single();

  if (!collectionRes.data) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collection = collectionRes.data as any;

  const productsRes = await sb
    .from("products")
    .select(`*, product_types(id, name), product_variants(id, color, hex, images, inventory(variant_id, size, qty))`)
    .eq("listed", true)
    .eq("collection_id", collection.id)
    .order("name", { ascending: true });

  const products = productsRes.data ?? [];

  return (
    <div style={{ backgroundColor: "var(--color-void)" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        className="border-b"
        style={{ borderColor: "var(--color-card-border)", backgroundColor: "var(--color-dark-forest)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-0 min-h-80">

            {/* Text side */}
            <div className="flex flex-col justify-center py-14 pr-0 md:pr-12">
              <p
                className="text-xs tracking-[0.22em] uppercase mb-4"
                style={{ color: "var(--color-gold-200)", fontFamily: "var(--font-body)" }}
              >
                Auréx · Collection
              </p>
              <h1
                className="text-4xl sm:text-5xl mb-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  color: "var(--color-fg)",
                  letterSpacing: "-0.01em",
                }}
              >
                {collection.name}
              </h1>
              {collection.description && (
                <p
                  className="text-sm leading-relaxed max-w-md"
                  style={{ color: "var(--color-fg-muted)", fontFamily: "var(--font-body)" }}
                >
                  {collection.description}
                </p>
              )}
              <p
                className="mt-6 text-xs"
                style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-mono)" }}
              >
                {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            </div>

            {/* Cover image side */}
            {collection.cover_image_url && (
              <div className="hidden md:block relative" style={{ minHeight: 320 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={collection.cover_image_url}
                  alt={collection.name}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, var(--color-dark-forest) 0%, transparent 30%)",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Products grid ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="text-lg mb-2"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--color-fg)" }}
            >
              No products in this collection yet.
            </p>
            <p className="text-sm" style={{ color: "var(--color-fg-muted)" }}>
              Check back soon — new pieces are on the way.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
