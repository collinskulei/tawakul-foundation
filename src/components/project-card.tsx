import Image from "next/image";
import Link from "next/link";
import type { ProjectProgress } from "@/lib/types";

export function ProjectCard({ project }: { project: ProjectProgress }) {
  const pct =
    project.goal_amount > 0
      ? Math.min(100, (project.raised_amount / project.goal_amount) * 100)
      : 0;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-green-100">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-green-950">{project.title}</h3>
        {project.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-stone-600">
            {project.description}
          </p>
        ) : null}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-green-100">
          <div
            className="h-full rounded-full bg-gold-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-sm font-semibold text-green-800">
          KES {project.raised_amount.toLocaleString()} raised of{" "}
          {project.goal_amount.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
