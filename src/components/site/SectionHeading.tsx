export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`mb-10 md:mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
      {eyebrow && (
        <p className="timecode mb-3">REC / {eyebrow}</p>
      )}
      <h2 className="font-display text-4xl md:text-6xl leading-[0.95] uppercase text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
