import Link from "next/link";
import PageHero from "./ui/PageHero";

type SimplePageProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  imageSrc?: string;
  imageAlt?: string;
};

const FALLBACK =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=80";

export default function SimplePage({
  title,
  description,
  primaryLabel,
  primaryHref,
  imageSrc,
  imageAlt,
}: SimplePageProps) {
  return (
    <main>
      <PageHero
        compact
        title={title}
        description={description}
        imageSrc={imageSrc || FALLBACK}
        imageAlt={imageAlt ?? ""}
        ctas={[
          { label: primaryLabel, href: primaryHref, variant: "accent" },
          { label: "Back to home", href: "/", variant: "ghost" },
        ]}
      />

      <section className="bg-[var(--background)]">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 py-10 md:px-6">
          <Link href="/markets/forex" className="btn-ghost">
            Explore markets
          </Link>
          <Link href="/contact" className="btn-ghost">
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}
