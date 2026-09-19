import type { Metadata } from "next";
import { Mail, MessageCircle, Users2 } from "lucide-react";
import { Container } from "@/components/container";
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

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-800">
                <MessageCircle size={26} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-green-950">
                Make a Donation
              </h3>
              <p className="mt-3 text-stone-600">
                Message us on WhatsApp and our team will share the current
                donation options and confirm your contribution.
              </p>
              <a
                href={donateWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-6 w-full rounded-full px-6 py-3 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
              >
                Donate via WhatsApp
              </a>
            </div>

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
          </div>

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-dashed border-green-200 bg-green-50 p-6 text-center">
            <p className="text-sm text-stone-600">
              Prefer email? Reach out at{" "}
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 font-semibold text-green-800 underline underline-offset-2"
              >
                <Mail size={16} /> {site.email}
              </a>
              . Online M-Pesa donations and a live fundraising goal tracker
              are coming soon.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
