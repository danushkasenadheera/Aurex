import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { fmtLKR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Delivery Policy",
  description: "Auréx delivery zones, shipping fees, and estimated delivery times.",
};

export default async function DeliveryPolicyPage() {
  const settings = await getSettings();
  const { zones, freeThreshold } = settings.shipping;

  const zoneRows = [
    { name: "Colombo", ...zones.Colombo },
    { name: "Suburbs", ...zones.Suburbs },
    { name: "Other Districts", ...zones["Other Districts"] },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-void)" }}>
      <section
        className="py-16 border-b"
        style={{ backgroundColor: "var(--color-dark-forest)", borderColor: "var(--color-card-border)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p
            className="text-xs tracking-[0.22em] uppercase mb-4"
            style={{ color: "var(--color-gold-200)", fontFamily: "var(--font-body)" }}
          >
            Shipping
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--color-fg)", letterSpacing: "-0.01em" }}
          >
            Delivery Policy
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--color-fg-muted)" }}>Last updated: May 2025</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">

          {/* Zones table */}
          <div>
            <h2 className="text-xl mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}>
              Standard Delivery Zones
            </h2>
            <div
              className="rounded-sm overflow-hidden"
              style={{ border: "1px solid var(--color-card-border)" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-dark-forest)" }}>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.12em]" style={{ color: "var(--color-fg-tertiary)" }}>Zone</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-[0.12em]" style={{ color: "var(--color-fg-tertiary)" }}>Delivery Days</th>
                    <th className="text-right px-4 py-3 text-xs uppercase tracking-[0.12em]" style={{ color: "var(--color-fg-tertiary)" }}>Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {zoneRows.map((z, i) => (
                    <tr
                      key={z.name}
                      style={{
                        borderTop: "1px solid var(--color-card-border)",
                        backgroundColor: i % 2 === 0 ? "var(--color-forest)" : "var(--color-dark-forest)",
                      }}
                    >
                      <td className="px-4 py-3" style={{ color: "var(--color-fg)" }}>{z.name}</td>
                      <td className="px-4 py-3" style={{ color: "var(--color-fg-muted)", fontFamily: "var(--font-mono)" }}>{z.days} days</td>
                      <td className="px-4 py-3 text-right" style={{ color: "var(--color-gold-400)", fontFamily: "var(--font-mono)" }}>{fmtLKR(z.fee)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 italic" style={{ color: "var(--color-fg-tertiary)" }}>
              Orders over {fmtLKR(freeThreshold)} qualify for free standard delivery island-wide.
            </p>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* Express */}
          <div>
            <h2 className="text-xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}>
              Express Delivery
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              Express delivery is available island-wide for a flat fee of{" "}
              <strong style={{ color: "var(--color-fg)", fontFamily: "var(--font-mono)" }}>LKR 1,200</strong>.
              Express orders placed before 12:00 PM (SLT) on business days are dispatched same day and typically
              arrive within 1–2 business days.
            </p>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* General conditions */}
          <div>
            <h2 className="text-xl mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}>
              General Conditions
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
              {[
                "All deliveries are made Monday to Friday. Orders placed on weekends or public holidays are processed on the next business day.",
                "Delivery times are estimates and are not guaranteed. Auréx is not liable for delays caused by courier services or events beyond our control.",
                "You will receive an order confirmation email once payment is verified. Tracking updates are provided by the courier.",
                "If a delivery attempt is unsuccessful, the courier will leave a notification. Please contact us if your parcel is not received within the estimated timeframe.",
                "Shipping fees are non-refundable unless the return is due to a defect or error on our part.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: "var(--color-gold-400)", flexShrink: 0 }}>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-card-border)" }} />

          {/* Contact */}
          <div
            className="rounded-sm p-6"
            style={{ backgroundColor: "var(--color-dark-forest)", border: "1px solid var(--color-card-border)" }}
          >
            <p className="text-xs tracking-[0.16em] uppercase mb-2" style={{ color: "var(--color-gold-200)" }}>
              Questions about your delivery?
            </p>
            <p className="text-sm" style={{ color: "var(--color-fg-muted)" }}>
              Contact us at{" "}
              <a
                href="mailto:hello@aurex.lk"
                style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                hello@aurex.lk
              </a>{" "}
              or use our{" "}
              <a
                href="/track-order"
                style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                order tracking
              </a>{" "}
              page.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
