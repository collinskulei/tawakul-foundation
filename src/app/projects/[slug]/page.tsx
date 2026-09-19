import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/animated-section";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { MpesaDonateForm } from "@/components/mpesa-donate-form";
import { createClient } from "@/lib/supabase/server";
import type { ProjectProgress } from "@/lib/types";

async function getProject(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_progress")
    .select("*")
    .eq("slug", slug)
    .single();

  return data as ProjectProgress | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  return {
    title: project ? `${project.title} | Tawakul Foundation` : "Project",
    description: project?.description ?? undefined,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const pct =
    project.goal_amount > 0
      ? Math.min(100, (project.raised_amount / project.goal_amount) * 100)
      : 0;

  return (
    <>
      <PageHero eyebrow="Project" title={project.title} />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <AnimatedSection>
            {project.cover_image_url ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-green-100">
                <Image
                  src={project.cover_image_url}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            {project.description ? (
              <p className="mt-6 text-lg leading-relaxed text-stone-700">
                {project.description}
              </p>
            ) : null}

            <div className="mt-6">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-green-100">
                <div
                  className="h-full rounded-full bg-gold-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 text-sm font-semibold text-green-800">
                KES {project.raised_amount.toLocaleString()} raised of{" "}
                {project.goal_amount.toLocaleString()} · {project.donor_count}{" "}
                donor{project.donor_count === 1 ? "" : "s"}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.1}
            className="rounded-2xl border border-green-100 bg-white p-8 shadow-sm"
          >
            <h2 className="text-xl font-bold text-green-950">
              Donate to this project
            </h2>
            <div className="mt-6">
              <MpesaDonateForm projectId={project.project_id} />
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </>
  );
}
