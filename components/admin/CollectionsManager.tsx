"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Collection } from "@/types/database.types";
import ImageUpload from "@/components/admin/ImageUpload";

interface Props {
  initialCollections: Collection[];
}

interface FormState {
  name: string;
  slug: string;
  description: string;
  cover_image_url: string;
}

const EMPTY_FORM: FormState = { name: "", slug: "", description: "", cover_image_url: "" };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CollectionsManager({ initialCollections }: Props) {
  const router = useRouter();
  const [collections, setCollections] = useState(initialCollections);

  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState<FormState>(EMPTY_FORM);
  const [newSlugManual, setNewSlugManual] = useState(false);
  const [adding, setAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const inp = {
    backgroundColor: "var(--color-forest)",
    border: "1px solid var(--color-card-border)",
    color: "var(--color-fg)",
    fontFamily: "var(--font-body)",
    outline: "none",
    padding: "8px 12px",
    borderRadius: "2px",
    fontSize: "13px",
    width: "100%",
  };
  const lbl: React.CSSProperties = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--color-fg-tertiary)",
    display: "block",
    marginBottom: "4px",
  };

  // ── New collection ──────────────────────────────────────────────────────────
  function handleNewNameChange(val: string) {
    setNewForm((f) => ({ ...f, name: val, slug: newSlugManual ? f.slug : slugify(val) }));
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newForm.name.trim() || !newForm.slug.trim()) return;
    setAdding(true);
    setError("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = createClient() as unknown as any;
    const { data, error: err } = await sb
      .from("collections")
      .insert({
        name: newForm.name.trim(),
        slug: newForm.slug.trim(),
        description: newForm.description.trim(),
        cover_image_url: newForm.cover_image_url,
      })
      .select()
      .single();

    if (err) {
      setError(err.message.includes("unique") ? "A collection with that slug already exists." : err.message);
    } else {
      setCollections((prev) => [...prev, data]);
      setNewForm(EMPTY_FORM);
      setNewSlugManual(false);
      setShowNew(false);
    }
    setAdding(false);
  }

  // ── Edit collection ─────────────────────────────────────────────────────────
  function startEdit(c: Collection) {
    setEditingId(c.id);
    setEditForm({ name: c.name, slug: c.slug, description: c.description, cover_image_url: c.cover_image_url });
    setError("");
  }

  async function handleSaveEdit() {
    if (!editForm.name.trim() || !editForm.slug.trim()) return;
    setSaving(true);
    setError("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = createClient() as unknown as any;
    const { error: err } = await sb
      .from("collections")
      .update({
        name: editForm.name.trim(),
        slug: editForm.slug.trim(),
        description: editForm.description.trim(),
        cover_image_url: editForm.cover_image_url,
      })
      .eq("id", editingId);

    if (err) {
      setError(err.message.includes("unique") ? "That slug is already used by another collection." : err.message);
    } else {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === editingId ? { ...c, ...editForm, name: editForm.name.trim(), slug: editForm.slug.trim(), description: editForm.description.trim() } : c
        )
      );
      setEditingId(null);
      router.refresh();
    }
    setSaving(false);
  }

  // ── Delete collection ───────────────────────────────────────────────────────
  async function handleDelete(id: string) {
    setDeletingId(id);
    setError("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sb = createClient() as unknown as any;
    const { error: err } = await sb.from("collections").delete().eq("id", id);
    if (err) {
      setError("Cannot delete — check if products are still assigned to this collection.");
    } else {
      setCollections((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    }
    setDeletingId(null);
  }

  return (
    <div className="max-w-3xl space-y-6">

      {/* ── Error ──────────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-sm px-4 py-3 rounded-sm" style={{ backgroundColor: "rgba(255,138,138,0.08)", border: "1px solid rgba(255,138,138,0.3)", color: "#ff8a8a" }}>
          {error}
        </p>
      )}

      {/* ── Add new ────────────────────────────────────────────────────────── */}
      {!showNew ? (
        <button
          onClick={() => { setShowNew(true); setError(""); }}
          className="px-5 py-2.5 rounded-sm text-sm font-medium"
          style={{ backgroundColor: "var(--color-gold-400)", color: "var(--color-void)", fontFamily: "var(--font-body)" }}
        >
          + New Collection
        </button>
      ) : (
        <form
          onSubmit={handleAdd}
          className="rounded-sm p-6 space-y-4"
          style={{ backgroundColor: "var(--color-dark-forest)", border: "1px solid var(--color-card-border)" }}
        >
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--color-gold-200)" }}>New Collection</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={lbl}>Name</label>
              <input style={inp} value={newForm.name} placeholder="Plain Essentials" onChange={(e) => handleNewNameChange(e.target.value)} required />
            </div>
            <div>
              <label style={lbl}>Slug (URL)</label>
              <input
                style={{ ...inp, fontFamily: "var(--font-mono)" }}
                value={newForm.slug}
                placeholder="plain-essentials"
                onChange={(e) => { setNewSlugManual(true); setNewForm((f) => ({ ...f, slug: e.target.value })); }}
                required
              />
              <p className="text-xs mt-1" style={{ color: "var(--color-fg-tertiary)" }}>
                Used in URL: /collections/<span style={{ fontFamily: "var(--font-mono)" }}>{newForm.slug || "slug"}</span>
              </p>
            </div>
          </div>

          <div>
            <label style={lbl}>Description</label>
            <textarea
              rows={2}
              style={{ ...inp, resize: "none" }}
              value={newForm.description}
              placeholder="Refined basics in signature colours…"
              onChange={(e) => setNewForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div>
            <ImageUpload
              images={newForm.cover_image_url ? [newForm.cover_image_url] : []}
              onChange={(urls) => setNewForm((f) => ({ ...f, cover_image_url: urls[urls.length - 1] ?? "" }))}
              uploadEndpoint="/api/upload/collection-cover"
              urlKey="cover"
              maxImages={1}
              label="Cover Image (800×1000px, auto-cropped)"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={adding || !newForm.name.trim() || !newForm.slug.trim()}
              className="px-5 py-2 rounded-sm text-sm font-medium"
              style={{
                backgroundColor: "var(--color-gold-400)",
                color: "var(--color-void)",
                opacity: (adding || !newForm.name.trim() || !newForm.slug.trim()) ? 0.6 : 1,
                cursor: (adding || !newForm.name.trim() || !newForm.slug.trim()) ? "not-allowed" : "pointer",
              }}
            >
              {adding ? "Creating…" : "Create Collection"}
            </button>
            <button
              type="button"
              onClick={() => { setShowNew(false); setNewForm(EMPTY_FORM); setNewSlugManual(false); }}
              className="px-5 py-2 rounded-sm text-sm"
              style={{ color: "var(--color-fg-muted)", border: "1px solid var(--color-card-border)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ── Collections list ───────────────────────────────────────────────── */}
      <div className="space-y-4">
        {collections.length === 0 && !showNew && (
          <div className="py-16 text-center rounded-sm" style={{ backgroundColor: "var(--color-dark-forest)", border: "1px solid var(--color-card-border)" }}>
            <p className="text-sm" style={{ color: "var(--color-fg-muted)" }}>No collections yet — create your first one above.</p>
          </div>
        )}

        {collections.map((c) => (
          <div key={c.id} className="rounded-sm overflow-hidden" style={{ border: "1px solid var(--color-card-border)" }}>
            {editingId === c.id ? (
              /* ── Edit form ── */
              <div className="p-6 space-y-4" style={{ backgroundColor: "var(--color-dark-forest)" }}>
                <p className="text-xs tracking-widest uppercase" style={{ color: "var(--color-gold-200)" }}>Editing Collection</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={lbl}>Name</label>
                    <input style={inp} value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={lbl}>Slug (URL)</label>
                    <input style={{ ...inp, fontFamily: "var(--font-mono)" }} value={editForm.slug} onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))} />
                    <p className="text-xs mt-1" style={{ color: "var(--color-fg-tertiary)" }}>
                      Changing the slug will break existing links to this collection.
                    </p>
                  </div>
                </div>

                <div>
                  <label style={lbl}>Description</label>
                  <textarea
                    rows={2}
                    style={{ ...inp, resize: "none" }}
                    value={editForm.description}
                    onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </div>

                <div>
                  <ImageUpload
                    images={editForm.cover_image_url ? [editForm.cover_image_url] : []}
                    onChange={(urls) => setEditForm((f) => ({ ...f, cover_image_url: urls[urls.length - 1] ?? "" }))}
                    uploadEndpoint="/api/upload/collection-cover"
                    urlKey="cover"
                    maxImages={1}
                    label="Cover Image (800×1000px, auto-cropped)"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSaveEdit}
                    disabled={saving}
                    className="px-5 py-2 rounded-sm text-sm font-medium"
                    style={{ backgroundColor: "var(--color-gold-400)", color: "var(--color-void)", opacity: saving ? 0.7 : 1 }}
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-5 py-2 rounded-sm text-sm"
                    style={{ color: "var(--color-fg-muted)", border: "1px solid var(--color-card-border)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* ── Row ── */
              <div className="flex items-center gap-5 px-5 py-4" style={{ backgroundColor: "var(--color-forest)" }}>
                {/* Cover thumbnail */}
                <div
                  className="shrink-0 rounded-sm overflow-hidden"
                  style={{ width: 48, height: 60, backgroundColor: "var(--color-dark-forest)", border: "1px solid var(--color-card-border)" }}
                >
                  {c.cover_image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.cover_image_url} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "var(--color-fg)" }}>{c.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-mono)" }}>
                    /collections/{c.slug}
                  </p>
                  {c.description && (
                    <p className="text-xs mt-1 truncate" style={{ color: "var(--color-fg-muted)" }}>{c.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4 shrink-0">
                  <button
                    onClick={() => startEdit(c)}
                    className="text-xs underline underline-offset-2"
                    style={{ color: "var(--color-gold-200)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    disabled={deletingId === c.id}
                    className="text-xs underline underline-offset-2"
                    style={{ color: "#ff8a8a", opacity: deletingId === c.id ? 0.5 : 1 }}
                  >
                    {deletingId === c.id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs" style={{ color: "var(--color-fg-tertiary)" }}>
        Deleting a collection unlinks it from all assigned products (their collection field is set to none). The products themselves are not deleted.
      </p>
    </div>
  );
}
