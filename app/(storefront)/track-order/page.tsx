"use client";

import { useActionState } from "react";
import { lookupOrder, type LookupState } from "./actions";
import { fmtLKR } from "@/lib/constants";
import type { Metadata } from "next";

// Note: metadata can't be exported from a client component — defined in layout or a separate segment.

const STATUS_COLORS: Record<string, string> = {
  "Awaiting Payment": "var(--color-status-awaiting-fg)",
  "Paid":             "var(--color-status-paid-fg)",
  "Packed":           "var(--color-status-packed-fg)",
  "Shipped":          "var(--color-status-shipped-fg)",
  "Delivered":        "var(--color-status-delivered-fg)",
  "Cancelled":        "var(--color-status-cancelled-fg)",
  "Refunded":         "var(--color-status-refunded-fg)",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", borderRadius: 2, fontSize: 13,
  backgroundColor: "var(--color-dark-forest)",
  border: "1px solid var(--color-card-border)",
  color: "var(--color-fg)", fontFamily: "var(--font-body)", outline: "none",
};

export default function TrackOrderPage() {
  const [state, formAction, pending] = useActionState<LookupState | null, FormData>(lookupOrder, null);

  return (
    <div style={{ backgroundColor: "var(--color-void)" }}>
      {/* Header */}
      <section
        className="py-16 border-b"
        style={{ backgroundColor: "var(--color-dark-forest)", borderColor: "var(--color-card-border)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p
            className="text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-gold-200)", fontFamily: "var(--font-body)" }}
          >
            Auréx
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--color-fg)", letterSpacing: "-0.01em" }}
          >
            Track Your Order
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--color-fg-muted)" }}>
            Enter your order number and email address to view your order status.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6">

          {/* Search form */}
          <form action={formAction} className="space-y-4">
            <div>
              <label
                className="block text-xs uppercase tracking-[0.12em] mb-1.5"
                style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-body)" }}
              >
                Order Number
              </label>
              <input
                type="text"
                name="order_number"
                placeholder="AX-123456"
                required
                style={{ ...inputStyle, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}
              />
            </div>
            <div>
              <label
                className="block text-xs uppercase tracking-[0.12em] mb-1.5"
                style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-body)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-sm text-sm font-medium tracking-wide"
              style={{
                backgroundColor: "var(--color-gold-400)",
                color: "var(--color-void)",
                fontFamily: "var(--font-body)",
                cursor: pending ? "not-allowed" : "pointer",
                opacity: pending ? 0.7 : 1,
                border: "none",
              }}
            >
              {pending ? "Looking up…" : "Track Order"}
            </button>
          </form>

          {/* Error */}
          {state?.error && (
            <p
              className="mt-6 text-sm px-4 py-3 rounded-sm"
              style={{
                backgroundColor: "rgba(255,138,138,0.08)",
                border: "1px solid rgba(255,138,138,0.3)",
                color: "#ff8a8a",
              }}
            >
              {state.error}
            </p>
          )}

          {/* Order result */}
          {state?.order && (
            <div className="mt-8 space-y-4">
              <div
                className="rounded-sm p-5"
                style={{ backgroundColor: "var(--color-dark-forest)", border: "1px solid var(--color-card-border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] mb-1" style={{ color: "var(--color-fg-tertiary)" }}>Order</p>
                    <p style={{ fontFamily: "var(--font-mono)", color: "var(--color-fg)", fontSize: 16, fontWeight: 500 }}>
                      {state.order.order_number}
                    </p>
                  </div>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full"
                    style={{
                      color: STATUS_COLORS[state.order.status] ?? "var(--color-fg-muted)",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: `1px solid ${STATUS_COLORS[state.order.status] ?? "var(--color-card-border)"}33`,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {state.order.status}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--color-fg-muted)" }}>
                  Hi {state.order.first_name} — your order was placed on{" "}
                  {new Date(state.order.created_at).toLocaleDateString("en-LK", { year: "numeric", month: "long", day: "numeric" })}.
                </p>
              </div>

              {/* Order lines */}
              {state.order.lines.length > 0 && (
                <div
                  className="rounded-sm overflow-hidden"
                  style={{ border: "1px solid var(--color-card-border)" }}
                >
                  {state.order.lines.map((line, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3"
                      style={{
                        borderTop: i > 0 ? "1px solid var(--color-card-border)" : undefined,
                        backgroundColor: "var(--color-forest)",
                      }}
                    >
                      <div>
                        <p className="text-sm" style={{ color: "var(--color-fg)" }}>{line.product_name}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--color-fg-tertiary)" }}>
                          {line.color} · {line.size} · Qty {line.qty}
                        </p>
                      </div>
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-fg-muted)" }}>
                        {fmtLKR(line.unit_price * line.qty)}
                      </p>
                    </div>
                  ))}
                  <div
                    className="flex justify-between px-4 py-3"
                    style={{ backgroundColor: "var(--color-dark-forest)", borderTop: "1px solid var(--color-card-border)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--color-fg)" }}>Total</span>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-gold-400)", fontWeight: 500 }}>
                      {fmtLKR(state.order.total)}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xs text-center" style={{ color: "var(--color-fg-tertiary)" }}>
                Need help?{" "}
                <a href="/contact" style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                  Contact us
                </a>
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
