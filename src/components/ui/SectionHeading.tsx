import FadeIn from "./FadeIn";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <FadeIn className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}>
      {badge && (
        <span
          className={`inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-4 ${
            light
              ? "bg-button/10 text-button"
              : "bg-white/10 text-white"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-3 ${
          light ? "text-primary" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl leading-relaxed whitespace-pre-line ${
            centered ? "mx-auto" : ""
          } ${light ? "text-primary/70" : "text-white/70"}`}
        >
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
