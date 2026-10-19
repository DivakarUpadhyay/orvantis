import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoShell } from "@/components/demos/DemoShell";
import { JsonLd } from "@/components/JsonLd";
import { demos, getDemo } from "@/lib/demos";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/demos/[slug]">) {
  const { slug } = await params;
  const d = getDemo(slug);
  if (!d) return {};
  return pageMeta({ title: `${d.title} — Live Demo`, description: `${d.summary} ${d.description}`.slice(0, 158), path: `/demos/${d.slug}` });
}

export default async function DemoPage({ params }: PageProps<"/demos/[slug]">) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Demos", path: "/demos" },
          { name: demo.title, path: `/demos/${demo.slug}` },
        ])}
      />
      <div className="container-x pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/demos" className="hover:text-brand">Demos</Link> / {demo.title}
        </nav>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Live demo: {demo.title}</h1>
      </div>
      <DemoShell active={demo} />
    </>
  );
}
