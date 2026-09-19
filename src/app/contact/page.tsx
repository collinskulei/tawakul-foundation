import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Tawakul Foundation",
  description:
    "Get in touch with Tawakul Foundation via email, phone, or WhatsApp.",
};

const generalWhatsapp = whatsappLink(
  "Assalamu alaikum, I have a question for Tawakul Foundation."
);

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: generalWhatsapp,
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        description="Whether you have a question, want to donate, or wish to volunteer, reach out any time."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {contactCards.map(
              ({ icon: Icon, label, value, href, external }, index) => {
                const content = (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-800">
                      <Icon size={26} />
                    </div>
                    <p className="mt-5 text-sm font-semibold tracking-wide text-green-700 uppercase">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-bold text-green-950">
                      {value}
                    </p>
                  </>
                );

                const cardClass =
                  "flex flex-col items-center rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm transition-shadow hover:shadow-md";

                return (
                  <AnimatedSection key={label} delay={index * 0.05}>
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className={cardClass}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={cardClass}>{content}</div>
                    )}
                  </AnimatedSection>
                );
              }
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
