import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Smartphone, Users2 } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Container } from "@/components/container";
import { MpesaDonateForm } from "@/components/mpesa-donate-form";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Involved | Tawakul Foundation",
  description:
    "Support Tawakul Foundation's mission through donations, volunteering, or partnership as we fundraise for our November 2026 orphanage visit.",
};

const donateWhatsapp = whatsappLink(
  "Assalamu alaikum, I would like to make a donation to Tawakul Foundation. Please share the details."
);
const volunteerWhatsapp = whatsappLink(
  "Assalamu alaikum, I would like to volunteer with Tawakul Foundation. Please share more information."
);

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Help Us Reach More Communities"
        description="We are currently fundraising for our next orphanage visit, scheduled for November 2026. Every contribution of time, resources, or funds helps."
      />

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Ways to Help"
            title="Donate, volunteer, or partner with us"
            center
          />

          <div className="mx-auto mt-14 grid max-w-4xl items-start gap-6 sm:grid-cols-2">
            <AnimatedSection>
              <div className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-800">
                    <Smartphone size={26} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-green-950">
                    Donate with M-Pesa
                  </h3>
                  <p className="mt-3 text-stone-600">
                    Enter your details below and confirm the payment prompt
                    sent to your phone.
                  </p>
                </div>
                <div className="mt-6">
                  <MpesaDonateForm />
                </div>
                <p className="mt-4 text-center text-xs text-stone-500">
                  Prefer WhatsApp?{" "}
                  <a
                    href={donateWhatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-green-700 underline underline-offset-2"
                  >
                    Message us instead
                  </a>
                  .
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="flex flex-col items-center rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-800">
                  <Users2 size={26} />
                </div>
                <h3 className="mt-5 text-xl font-bold text-green-950">
                  Volunteer With Us
                </h3>
                <p className="mt-3 text-stone-600">
                  Join our growing team of volunteers helping organize
                  fundraising and charitable activities in Busia and beyond.
                </p>
                <a
                  href={volunteerWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 w-full rounded-full border border-green-700 px-6 py-3 text-sm font-bold text-green-800 transition-colors hover:bg-green-50"
                >
                  Volunteer via WhatsApp
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection
            delay={0.2}
            className="mx-auto mt-10 max-w-4xl rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center"
          >
            <p className="text-sm text-stone-600">
              Prefer email? Reach out at{" "}
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 font-semibold text-green-800 underline underline-offset-2"
              >
                <Mail size={16} /> {site.email}
              </a>
              . Want to donate toward a specific initiative? See our{" "}
              <Link
                href="/projects"
                className="font-semibold text-green-800 underline underline-offset-2"
              >
                current projects
              </Link>{" "}
              and their fundraising goals.
            </p>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
