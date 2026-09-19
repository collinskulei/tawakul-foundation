import Image from "next/image";
import Link from "next/link";
import {
  HandHeart,
  Home as HomeIcon,
  Landmark,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { Container } from "@/components/container";
import { GlowOrbs } from "@/components/glow-orbs";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site";

const pillars = [
  {
    icon: Sparkles,
    title: "Orphans",
    description:
      "Visits, essentials, and consistent support for children growing up without parental care.",
  },
  {
    icon: Users,
    title: "Widows",
    description:
      "Standing with widows in our communities through material and emotional support.",
  },
  {
    icon: HomeIcon,
    title: "The Elderly",
    description:
      "Caring for elderly community members who need companionship and assistance.",
  },
  {
    icon: HandHeart,
    title: "Families in Hardship",
    description:
      "Bridging generosity from donors to families facing financial difficulty.",
  },
];

const timeline = [
  {
    date: "December 2025",
    title: "Tawakul Foundation Founded",
    description:
      "Established in Busia, Western Kenya, to bridge donors and communities most in need of support.",
  },
  {
    date: "March 2026",
    title: "First Orphanage Visit",
    description:
      "Our team visited Ikhlas Education Center, interacting with and supporting the children there.",
  },
  {
    date: "November 2026",
    title: "Next Orphanage Visit",
    description:
      "We are currently fundraising to expand our reach and carry out our next charitable visit.",
    highlight: true,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-green-950">
        <GlowOrbs variant="dark" />

        <Container className="relative flex flex-col items-center gap-10 py-20 text-center sm:py-28">
          <Image
            src="/images/tawakul-calligraphy.png"
            alt="Tawakul, written in Arabic calligraphy"
            width={475}
            height={511}
            className="h-36 w-auto drop-shadow-[0_0_24px_rgba(217,164,65,0.35)] sm:h-44"
            priority
          />
          <div>
            <h1 className="text-4xl font-bold text-white sm:text-6xl">
              Where Faith Meets Compassion
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-green-100 sm:text-xl">
              Tawakul Foundation is a Muslim charitable organization making a
              meaningful difference in the lives of orphans, widows, the
              elderly, and families facing financial hardship.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/get-involved"
              className="btn-primary rounded-full px-8 py-3.5 text-base font-bold text-green-950 shadow-lg transition-transform hover:scale-[1.03]"
            >
              Support Our Mission
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Learn Our Story
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Mission"
            title="A bridge between generosity and need"
            description="We believe everyone has a role to play in giving back to society. Tawakul Foundation connects donors, well-wishers, and people with a desire to make a difference to the individuals and communities who need it most."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, description }, index) => (
              <AnimatedSection key={title} delay={index * 0.05}>
                <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-800">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-green-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">
                    {description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-green-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Our Journey"
            title="From our first visit to what's next"
            center
          />

          <AnimatedSection className="mx-auto mt-14 max-w-3xl">
            <ol className="relative space-y-10 border-l-2 border-green-200 pl-8">
              {timeline.map((item) => (
                <li key={item.date} className="relative">
                  <span
                    className={`absolute top-1 -left-[2.55rem] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-green-50 ${
                      item.highlight ? "bg-gold-500" : "bg-green-700"
                    }`}
                  />
                  <p
                    className={`text-sm font-bold tracking-wide uppercase ${
                      item.highlight ? "text-gold-600" : "text-green-700"
                    }`}
                  >
                    {item.date}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-green-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-stone-600">{item.description}</p>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <AnimatedSection>
            <span className="inline-block text-sm font-semibold tracking-wide text-green-700 uppercase">
              Powered by Volunteers
            </span>
            <h2 className="mt-4 text-3xl font-bold text-green-950 sm:text-4xl">
              A growing community of compassion
            </h2>
            <p className="mt-5 text-lg text-stone-600">
              Tawakul Foundation is powered by a growing team of volunteers and
              supporters from Kenya and beyond. Through social media and other
              platforms, individuals from different backgrounds come together to
              participate in fundraising, organize charitable activities, and
              contribute their time, resources, and skills toward our mission.
            </p>
            <p className="mt-4 text-lg text-stone-600">
              Our vision is simple: to create a community where compassion
              becomes action and where those who are most vulnerable are not
              forgotten.
            </p>
          </AnimatedSection>
          <AnimatedSection
            delay={0.1}
            className="relative overflow-hidden rounded-3xl border border-green-100 p-10 text-center text-white"
          >
            <Image
              src="/images/ikhlas/grounds-02.jpg"
              alt="Ikhlas Education Center grounds during our March 2026 visit"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-green-950/80" />
            <div className="relative">
              <Landmark className="mx-auto text-gold-400" size={40} />
              <h3 className="mt-5 text-2xl font-bold">
                Help us reach Ikhlas Education Center again
              </h3>
              <p className="mt-3 text-green-100">
                We are fundraising for our next orphanage visit, scheduled for
                November 2026. Every contribution brings us closer to reaching
                more vulnerable communities.
              </p>
              <Link
                href="/get-involved"
                className="btn-primary mt-6 inline-block rounded-full px-8 py-3.5 text-base font-bold text-green-950 shadow-lg transition-transform hover:scale-[1.03]"
              >
                Get Involved
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-green-100 bg-green-950 py-16">
        <GlowOrbs variant="dark" />
        <Container className="relative flex flex-col items-center gap-6 text-center text-white sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">
              Have questions about {site.name}?
            </h2>
            <p className="mt-2 text-green-200">
              Reach out, we would love to hear from you.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-8 py-3.5 text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>
        </Container>
      </section>
    </>
  );
}
