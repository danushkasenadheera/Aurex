import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Auréx. We're here to help.",
};

export default function ContactPage() {
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
            Contact Us
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--color-fg-muted)", fontFamily: "var(--font-body)" }}>
            We typically respond within 2 business days.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <p
                  className="text-xs tracking-[0.16em] uppercase mb-4"
                  style={{ color: "var(--color-gold-200)", fontFamily: "var(--font-body)" }}
                >
                  Reach Us
                </p>
                <div className="space-y-4 text-sm" style={{ color: "var(--color-fg-muted)" }}>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-fg)" }}>Email</p>
                    <a
                      href="mailto:hello@aurex.lk"
                      style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}
                    >
                      hello@aurex.lk
                    </a>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-fg)" }}>WhatsApp</p>
                    <p>Available Mon–Fri · 9:00 AM – 6:00 PM (SLT)</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1" style={{ color: "var(--color-fg)" }}>Returns & Exchanges</p>
                    <a
                      href="mailto:returns@aurex.lk"
                      style={{ color: "var(--color-gold-400)", textDecoration: "underline", textUnderlineOffset: 3 }}
                    >
                      returns@aurex.lk
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="rounded-sm p-5"
                style={{ backgroundColor: "var(--color-dark-forest)", border: "1px solid var(--color-card-border)" }}
              >
                <p
                  className="text-xs tracking-[0.14em] uppercase mb-3"
                  style={{ color: "var(--color-gold-200)", fontFamily: "var(--font-body)" }}
                >
                  Business Hours
                </p>
                <div className="space-y-1 text-sm" style={{ color: "var(--color-fg-muted)" }}>
                  <div className="flex justify-between">
                    <span>Monday – Friday</span>
                    <span style={{ fontFamily: "var(--font-mono)" }}>9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday – Sunday</span>
                    <span style={{ color: "var(--color-fg-disabled)" }}>Closed</span>
                  </div>
                </div>
                <p className="text-xs mt-3 italic" style={{ color: "var(--color-fg-tertiary)" }}>
                  Sri Lanka Time (GMT+5:30). Responses may be delayed on public holidays.
                </p>
              </div>
            </div>

            {/* Message form */}
            <div>
              <p
                className="text-xs tracking-[0.16em] uppercase mb-4"
                style={{ color: "var(--color-gold-200)", fontFamily: "var(--font-body)" }}
              >
                Send a Message
              </p>
              <form className="space-y-4" action="mailto:hello@aurex.lk" method="post" encType="text/plain">
                <div>
                  <label
                    className="block text-xs uppercase tracking-[0.12em] mb-1.5"
                    style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-body)" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    style={{
                      width: "100%", padding: "9px 12px", borderRadius: 2, fontSize: 13,
                      backgroundColor: "var(--color-dark-forest)",
                      border: "1px solid var(--color-card-border)",
                      color: "var(--color-fg)", fontFamily: "var(--font-body)", outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs uppercase tracking-[0.12em] mb-1.5"
                    style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-body)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    style={{
                      width: "100%", padding: "9px 12px", borderRadius: 2, fontSize: 13,
                      backgroundColor: "var(--color-dark-forest)",
                      border: "1px solid var(--color-card-border)",
                      color: "var(--color-fg)", fontFamily: "var(--font-body)", outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs uppercase tracking-[0.12em] mb-1.5"
                    style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-body)" }}
                  >
                    Order Number (optional)
                  </label>
                  <input
                    type="text"
                    name="order"
                    placeholder="AX-XXXXXX"
                    style={{
                      width: "100%", padding: "9px 12px", borderRadius: 2, fontSize: 13,
                      backgroundColor: "var(--color-dark-forest)",
                      border: "1px solid var(--color-card-border)",
                      color: "var(--color-fg)", fontFamily: "var(--font-mono)", outline: "none",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs uppercase tracking-[0.12em] mb-1.5"
                    style={{ color: "var(--color-fg-tertiary)", fontFamily: "var(--font-body)" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    style={{
                      width: "100%", padding: "9px 12px", borderRadius: 2, fontSize: 13,
                      backgroundColor: "var(--color-dark-forest)",
                      border: "1px solid var(--color-card-border)",
                      color: "var(--color-fg)", fontFamily: "var(--font-body)", outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-sm text-sm font-medium tracking-wide"
                  style={{
                    backgroundColor: "var(--color-gold-400)",
                    color: "var(--color-void)",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
