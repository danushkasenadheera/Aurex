"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

const SYMBOLS = ["→", "←", "↑", "↓", "•", "★", "✓", "✗", "™", "®", "©", "°", "…", "—", "·"];
const EMOJI   = ["🔥", "⭐", "💎", "✅", "❌", "🎯", "💫", "🌟", "👑", "💪", "⚡", "🛡️", "🧵", "👕", "🎖️"];

// Emoji fonts appended so emoji always render in the editor
const FONT = `var(--font-body),"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        style: [
          "min-height:120px",
          "padding:10px 14px",
          "outline:none",
          "font-size:14px",
          "line-height:1.6",
          `color:var(--color-fg)`,
          `font-family:${FONT}`,
        ].join(";"),
      },
    },
  });

  function insertChar(char: string) {
    editor?.chain().focus().insertContent(char).run();
    setPickerOpen(false);
  }

  function btn(active: boolean) {
    return {
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 30, height: 30, borderRadius: 4, border: "none", cursor: "pointer",
      backgroundColor: active ? "rgba(212,162,76,0.18)" : "transparent",
      color: active ? "var(--color-gold-400)" : "var(--color-fg-muted)",
      fontSize: 13, fontWeight: 600,
    } as React.CSSProperties;
  }

  const divider = (
    <span style={{ width: 1, height: 18, backgroundColor: "var(--color-card-border)", margin: "0 4px", display: "inline-block" }} />
  );

  return (
    <div style={{ border: "1px solid var(--color-card-border)", borderRadius: 2, backgroundColor: "var(--color-forest)", overflow: "visible" }}>

      {/* Toolbar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 2,
        padding: "6px 8px", borderBottom: "1px solid var(--color-card-border)",
        backgroundColor: "var(--color-dark-forest)",
      }}>
        <button type="button" title="Bold" style={btn(!!editor?.isActive("bold"))}
          onClick={() => editor?.chain().focus().toggleBold().run()}>
          <strong>B</strong>
        </button>
        <button type="button" title="Italic" style={btn(!!editor?.isActive("italic"))}
          onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <em>I</em>
        </button>
        {divider}
        <button type="button" title="Bullet list" style={btn(!!editor?.isActive("bulletList"))}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          ☰
        </button>
        <button type="button" title="Numbered list" style={btn(!!editor?.isActive("orderedList"))}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          №
        </button>
        {divider}
        {/* Symbols + emoji picker */}
        <div style={{ position: "relative" }}>
          <button type="button" title="Insert symbol or emoji" style={btn(pickerOpen)}
            onClick={() => setPickerOpen((v) => !v)}>
            ☺
          </button>

          {pickerOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 50,
              backgroundColor: "var(--color-deep-teal)",
              border: "1px solid var(--color-card-border)",
              borderRadius: 4, padding: 10, width: 240,
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-fg-tertiary)", marginBottom: 6 }}>
                Symbols
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3, marginBottom: 10 }}>
                {SYMBOLS.map((s) => (
                  <button key={s} type="button" onClick={() => insertChar(s)}
                    style={{ ...btn(false), width: 28, height: 28, fontSize: 14, borderRadius: 3 }}>
                    {s}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-fg-tertiary)", marginBottom: 6 }}>
                Emoji
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {EMOJI.map((e) => (
                  <button key={e} type="button" onClick={() => insertChar(e)}
                    style={{ ...btn(false), width: 28, height: 28, fontSize: 16, borderRadius: 3, fontFamily: FONT }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
