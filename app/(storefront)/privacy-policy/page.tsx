import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Auréx collects, uses, and protects your personal data.",
};

const sections = [
  {
    heading: "1. Information We Collect",
    body: `When you place an order or create an account, we collect personal information including your name, email address, phone number, and delivery address. We also collect order history and payment confirmation details. We do not store card numbers (all payments are via bank transfer).`,
  },
  {
    heading: "2. How We Use Your Information",
    body: `We use your information to process and deliver orders, communicate order updates, respond to customer support queries, and improve our products and services. We do not sell or rent your personal data to third parties.`,
  },
  {
    heading: "3. Data Sharing",
    body: `We share your delivery address and contact number with our courier partners solely for the purpose of fulfilling your order. We may share anonymised, aggregated data for analytics. We do not share identifiable personal data with any third parties for marketing purposes.`,
  },
  {
    heading: "4. Cookies",
    body: `Our website uses cookies to maintain your session, remember your cart, and save your theme preference. These cookies are functional and do not track you across third-party websites. You can disable cookies in your browser settings, though some features may not function correctly.`,
  },
  {
    heading: "5. Data Retention",
    body: `We retain your personal data for as long as your account is active or as required to fulfil orders and comply with legal obligations. You may request deletion of your account and associated data by contacting us at hello@wearaurex.com.`,
  },
  {
    heading: "6. Security",
    body: `We implement industry-standard security measures including encrypted data transmission (HTTPS) and secure authentication. However, no transmission over the internet is fully secure, and we cannot guarantee absolute security.`,
  },
  {
    heading: "7. Your Rights",
    body: `You have the right to access, correct, or delete your personal data held by us. To exercise these rights, contact us at hello@wearaurex.com. We will respond within 14 business days.`,
  },
  {
    heading: "8. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. Material changes will be communicated via email or a notice on our website. Continued use of our services after such changes constitutes your acceptance of the updated policy.`,
  },
  {
    heading: "9. Contact",
    body: `For any privacy-related queries, contact us at hello@wearaurex.com or write to: Auréx (Pvt) Ltd, Colombo, Sri Lanka.`,
  },
];

export default function PrivacyPolicyPage() {
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
            Legal
          </p>
          <h1
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "var(--color-fg)", letterSpacing: "-0.01em" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--color-fg-muted)" }}>Last updated: May 2025</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          {sections.map(({ heading, body }) => (
            <div key={heading}>
              <h2
                className="text-lg mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "var(--color-fg)" }}
              >
                {heading}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-fg-muted)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
