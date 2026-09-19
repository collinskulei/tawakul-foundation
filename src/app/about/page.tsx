import type { Metadata } from "next";
import { Compass, HeartHandshake, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About Us | Tawakul Foundation",
  description:
    "Learn about Tawakul Foundation's mission, story, and vision for supporting vulnerable communities in Busia, Western Kenya.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        description="Founded in December 2025 in Busia, Western Kenya, to serve orphans, widows, the elderly, and families facing hardship."
      />

      <section className="py-20 sm:py-28">
        <Container className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-stone-700">
          <p>
            Tawakul Foundation is a Muslim charitable organization founded in
            December 2025 and based in Busia, Western Kenya. Our mission is
            to make a meaningful difference in the lives of vulnerable
            members of our communities, particularly orphans, widows,
            elderly people, and families facing financial hardship.
          </p>
          <p>
            We believe that everyone has a role to play in giving back to
            society. Tawakul Foundation serves as a bridge between donors,
            well-wishers, and people with a desire to make a difference and
            the individuals and communities who are most in need of support.
            Through fundraising initiatives, charitable visits, and
            community projects, we work to ensure that generosity reaches
            those who need it most.
          </p>
          <p>
            In March 2026, the foundation carried out its first orphanage
            visit to Ikhlas Education Center, where the team had the
            opportunity to interact with and support the children. The
            experience strengthened our commitment to continuing this work
            and reaching more vulnerable communities.
          </p>
          <p>
            We are currently fundraising for our next orphanage visit,
            scheduled for November 2026, as we continue expanding our
            charitable activities.
          </p>
          <p>
            Tawakul Foundation is powered by a growing team of volunteers
            and supporters from Kenya and beyond. Through social media and
            other platforms, individuals from different backgrounds come
            together to participate in fundraising, organize charitable
            activities, and contribute their time, resources, and skills
            toward our mission.
          </p>
        </Container>
      </section>

      <section className="bg-green-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What Drives Us"
            title="Our Mission, Vision & Values"
            center
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
              <Compass className="mx-auto text-green-700" size={32} />
              <h3 className="mt-4 text-xl font-bold text-green-950">
                Mission
              </h3>
              <p className="mt-3 text-stone-600">
                To make a meaningful difference in the lives of vulnerable
                members of our communities through fundraising, charitable
                visits, and community projects.
              </p>
            </div>
            <div className="rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
              <Sparkles className="mx-auto text-green-700" size={32} />
              <h3 className="mt-4 text-xl font-bold text-green-950">
                Vision
              </h3>
              <p className="mt-3 text-stone-600">
                A community where compassion becomes action and where those
                who are most vulnerable are never forgotten.
              </p>
            </div>
            <div className="rounded-2xl border border-green-100 bg-white p-8 text-center shadow-sm">
              <HeartHandshake className="mx-auto text-green-700" size={32} />
              <h3 className="mt-4 text-xl font-bold text-green-950">
                Values
              </h3>
              <p className="mt-3 text-stone-600">
                Faith, compassion, and trust — serving as a transparent
                bridge between generous donors and the communities who need
                their support most.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
