import { Container } from "./container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-green-950">
      <Container className="py-16 text-center sm:py-20">
        {eyebrow ? (
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-semibold tracking-wide text-gold-400 uppercase">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-lg text-green-100">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
