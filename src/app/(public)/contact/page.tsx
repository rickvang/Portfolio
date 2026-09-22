import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="public-page">
      <section className="hero public-hero">
        <p className="eyebrow">Contact</p>
        <h1>Start a conversation.</h1>
        <p className="lede">
          The contact boundary is local-first for now. It does not transmit data to an external service.
        </p>
      </section>

      <section aria-labelledby="contact-form-heading" className="content-section split-section">
        <div className="section-heading">
          <p className="eyebrow">Message</p>
          <h2 id="contact-form-heading">What would you like to talk about?</h2>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
