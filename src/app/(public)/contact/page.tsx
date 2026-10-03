import contact from "../../../../content/profile/contact.json";

export default function ContactPage() {
  return (
    <div className="public-page">
      <section className="hero public-hero">
        <h1>Start a conversation.</h1>
        <p className="lede">
          For product design opportunities or questions about my work, email me or connect on LinkedIn.
        </p>
        <div className="contact-links">
          <a className="button button-primary" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <a className="button button-secondary" href={contact.linkedInUrl}>
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
