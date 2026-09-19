export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow ? (
        <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-semibold tracking-wide text-green-800 uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl font-bold text-green-950 sm:text-4xl">
        {title}
      </h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gold-500 ${center ? "mx-auto" : ""}`}
      />
      {description ? (
        <p
          className={`mt-5 max-w-2xl text-lg text-stone-600 ${center ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
