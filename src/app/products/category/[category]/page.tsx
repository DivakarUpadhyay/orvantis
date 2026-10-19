import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { OrderingProcess, ProductCard, ProductCategoryNav } from "@/components/products";
import { RfqForm } from "@/components/RfqForm";
import { PageHero, SectionHeading } from "@/components/ui";
import { getProductCategory, productCategories, productsByCategory } from "@/lib/products";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return Object.values(productCategories).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/category/[category]">) {
  const { category } = await params;
  const c = getProductCategory(category);
  if (!c) return {};
  const list = productsByCategory(c.id);
  return pageMeta({
    title: `${c.title} — Wholesale`,
    description: `${c.blurb} Available in bulk with delivery across India and Taiwan and OEM options.`,
    path: `/products/category/${c.slug}`,
    keywords: [`${c.title.toLowerCase()} wholesale`, `${c.short.toLowerCase()} supplier`, ...list.map((p) => p.name.toLowerCase())],
  });
}

export default async function ProductCategoryPage({ params }: PageProps<"/products/category/[category]">) {
  const { category } = await params;
  const cat = getProductCategory(category);
  if (!cat) notFound();
  const list = productsByCategory(cat.id);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: cat.title, path: `/products/category/${cat.slug}` },
        ])}
      />
      <PageHero
        section="products"
        trail={[{ label: cat.group === "shop" ? "New hardware" : "Offers", href: cat.group === "shop" ? "/products#new" : "/products#offers" }, { label: cat.title }]}
        eyebrow="Products"
        title={cat.title}
        text={cat.blurb}
      >
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand">
          <Icon name={cat.icon} className="h-4 w-4" /> OEM and custom configurations available
        </p>
      </PageHero>
      <section className="container-x py-12">
        <ProductCategoryNav active={cat.id} />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="acrylic border-y border-line py-14">
        <div className="container-x">
          <SectionHeading eyebrow="How to order" title="From quote to delivery" />
          <div className="mt-8">
            <OrderingProcess />
          </div>
        </div>
      </section>
      <section id="rfq" className="container-x scroll-mt-20 py-14">
        <div className="mx-auto max-w-3xl">
          <SectionHeading title="Request a wholesale quote" center />
          <div className="mt-8">
            <RfqForm />
          </div>
        </div>
      </section>
    </>
  );
}
