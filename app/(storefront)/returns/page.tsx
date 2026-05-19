import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return Policy",
  description: "Auréx return and exchange policy. Learn how to return or exchange your order.",
};

export default function ReturnsPage() {
  return (
    <div style={{ backgroundColor: "var(--color-void)" }}>
      {/* Header */}
      <section
        className="py-16 border-b"
        style={{
          backgroundColor: "var(--color-dark-forest)",
          borderColor: "var(--color-card-border)",
        }}
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
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "var(--color-fg)",
              letterSpacing: "-0.01em",
            }}
          >
            Return Policy
          </h1>
          <p
            className="mt-3 text-sm"
            style={{ color: "var(--color-fg-muted)", fontFamily: "var(--font-body)" }}
          >
            Last updated: May 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">

          {/* Eligibility */}
          <div>
            <h2
              className="text-xl mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}
            >
              Eligibility
            </h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              <p>
                We accept returns and exchanges within <strong style={{ color: "var(--color-fg)" }}>7 days</strong> of
                delivery, provided the item is unworn, unwashed, and in its original condition with all tags attached.
              </p>
              <p>
                Items marked as <strong style={{ color: "var(--color-fg)" }}>Final Sale</strong> are not eligible for
                return or exchange.
              </p>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* How to Return */}
          <div>
            <h2
              className="text-xl mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}
            >
              How to Initiate a Return
            </h2>
            <ol className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              {[
                {
                  step: "1",
                  text: "Email us at returns@aurex.lk with your order number (e.g. AX-123456), the item(s) you wish to return, and the reason.",
                },
                {
                  step: "2",
                  text: "We will respond within 2 business days with return instructions and a drop-off or pickup arrangement.",
                },
                {
                  step: "3",
                  text: "Pack the item securely in its original packaging. Include a note with your order number inside the package.",
                },
                {
                  step: "4",
                  text: "Once we receive and inspect the item, we will process your exchange or refund within 5 business days.",
                },
              ].map(({ step, text }) => (
                <li key={step} className="flex gap-4">
                  <span
                    className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: "rgba(212,162,76,0.12)",
                      color: "var(--color-gold-400)",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid rgba(212,162,76,0.3)",
                    }}
                  >
                    {step}
                  </span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* Refunds */}
          <div>
            <h2
              className="text-xl mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}
            >
              Refunds
            </h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              <p>
                Approved refunds are issued to the original payment method. Since all orders are settled via
                bank transfer, refunds are processed as a bank transfer back to your account within
                <strong style={{ color: "var(--color-fg)" }}> 5–7 business days</strong> of approval.
              </p>
              <p>
                Shipping fees are non-refundable unless the return is due to a defect or error on our part.
              </p>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* Exchanges */}
          <div>
            <h2
              className="text-xl mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}
            >
              Exchanges
            </h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              <p>
                We offer size and colour exchanges subject to availability. If your preferred exchange is out of
                stock, we will issue a full refund instead.
              </p>
              <p>
                Exchange items are dispatched once we receive and inspect the returned item.
              </p>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* Defective items */}
          <div>
            <h2
              className="text-xl mb-4"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}
            >
              Defective or Incorrect Items
            </h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              <p>
                If you receive a defective, damaged, or incorrect item, please contact us within{" "}
                <strong style={{ color: "var(--color-fg)" }}>48 hours</strong> of delivery with photos of the issue.
                We will arrange a free return and send a replacement or issue a full refund at no cost to you.
              </p>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* Contact */}
          <div
            className="rounded-sm p-6"
            style={{
              backgroundColor: "var(--color-dark-forest)",
              border: "1px solid var(--color-card-border)",
            }}
          >
            <p
              className="text-xs tracking-[0.16em] uppercase mb-3"
              style={{ color: "var(--color-gold-200)" }}
            >
              Questions?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              Reach us at{" "}
              <a
                href="mailto:returns@aurex.lk"
                style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                returns@aurex.lk
              </a>{" "}
              or through your{" "}
              <Link
                href="/account"
                style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                account page
              </Link>
              . We aim to respond within 2 business days.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
