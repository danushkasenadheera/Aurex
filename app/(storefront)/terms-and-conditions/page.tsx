import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Auréx terms and conditions of sale and use.",
};

const sections = [
  {
    heading: "1. General",
    body: `These Terms and Conditions govern the use of the Auréx website and the purchase of products from Auréx (Pvt) Ltd ("Auréx", "we", "us"). By placing an order, you agree to these terms in full. We reserve the right to update these terms at any time; continued use of the site constitutes acceptance of the current version.`,
  },
  {
    heading: "2. Products & Pricing",
    body: `All prices are displayed in Sri Lankan Rupees (LKR) and are inclusive of any applicable taxes. Auréx reserves the right to change prices at any time without notice. Product images are for illustration purposes; minor colour variations may occur due to screen calibration. We do not guarantee that product descriptions are error-free and reserve the right to correct any inaccuracies.`,
  },
  {
    heading: "3. Orders & Payment",
    body: `Orders are accepted via the website only. All payments are processed via bank transfer to Commercial Bank of Ceylon. An order is confirmed only after payment is received and verified by our team. Auréx reserves the right to cancel any order at its discretion, including if payment is not received within 48 hours of order placement.`,
  },
  {
    heading: "4. Shipping & Delivery",
    body: `Delivery times are estimates and are not guaranteed. Auréx is not responsible for delays caused by courier services, public holidays, or events beyond our control. Shipping fees are non-refundable unless the return is due to an error on our part. Risk of loss and title for items purchased pass to you upon delivery.`,
  },
  {
    heading: "5. Returns & Exchanges",
    body: `Returns and exchanges are accepted within 7 days of delivery, subject to our Return Policy. Items must be unworn, unwashed, and in original condition with all tags attached. Final Sale items are not eligible for return. Please review our Return Policy page for full details.`,
  },
  {
    heading: "6. Intellectual Property",
    body: `All content on this website — including text, images, logos, and design elements — is the intellectual property of Auréx (Pvt) Ltd and may not be reproduced, distributed, or used without prior written permission.`,
  },
  {
    heading: "7. Limitation of Liability",
    body: `To the fullest extent permitted by law, Auréx shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our liability is limited to the purchase price of the product in question.`,
  },
  {
    heading: "8. Governing Law",
    body: `These terms are governed by and construed in accordance with the laws of Sri Lanka. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.`,
  },
  {
    heading: "9. Contact",
    body: `For any queries regarding these terms, please contact us at hello@wearaurex.com.`,
  },
];

export default function TermsPage() {
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
            Terms & Conditions
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
