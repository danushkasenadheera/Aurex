import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import CollectionsManager from "@/components/admin/CollectionsManager";

export const metadata: Metadata = { title: "Collections | Admin" };

export default async function CollectionsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as unknown as any;
  const { data: staffRow } = await sb.from("staff").select("id").eq("id", user.id).single();
  if (!staffRow) redirect("/admin/login");

  const { data: collections } = await sb
    .from("collections")
    .select("id, name, slug, description, cover_image_url, created_at")
    .order("created_at", { ascending: true });

  return (
    <div className="p-8" style={{ backgroundColor: "var(--color-void)", minHeight: "100vh" }}>
      <div className="mb-8">
        <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--color-gold-200)" }}>
          Admin Console · Catalogue
        </p>
        <h1
          className="text-3xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--color-fg)" }}
        >
          Collections
        </h1>
        <p className="text-sm mt-2" style={{ color: "var(--color-fg-muted)" }}>
          Define collections and assign products to them from the product editor.
        </p>
      </div>

      <CollectionsManager initialCollections={collections ?? []} />
    </div>
  );
}
