import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { createClient } from "@/lib/supabase/server";
import type { ProjectProgress } from "@/lib/types";

export const metadata: Metadata = {
  title: "Projects | Tawakul Foundation",
  description:
    "See what Tawakul Foundation is currently fundraising for and track progress toward each goal.",
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("project_progress")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const projects = (data as ProjectProgress[] | null) ?? [];

  return (
    <>
      <PageHero
        eyebrow="Our Projects"
        title="What We're Fundraising For"
        description="Every donation is tracked against a goal, so you can see exactly how close we are to reaching it."
      />

      <section className="py-20 sm:py-28">
        <Container>
          {projects.length === 0 ? (
            <p className="text-center text-stone-600">
              No active projects right now. Check back soon, or visit Get
              Involved to support our general fund.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <AnimatedSection
                  key={project.project_id}
                  delay={index * 0.05}
                >
                  <ProjectCard project={project} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
