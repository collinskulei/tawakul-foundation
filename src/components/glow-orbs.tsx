export function GlowOrbs({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const green = variant === "dark" ? "bg-green-700/40" : "bg-green-300/30";
  const gold = variant === "dark" ? "bg-gold-500/25" : "bg-gold-400/20";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={`absolute -top-24 -left-24 h-96 w-96 rounded-full ${green} blur-[100px]`}
      />
      <div
        className={`absolute top-1/3 -right-24 h-96 w-96 rounded-full ${gold} blur-[100px]`}
      />
      <div
        className={`absolute -bottom-32 left-1/3 h-80 w-80 rounded-full ${green} blur-[90px]`}
      />
    </div>
  );
}
