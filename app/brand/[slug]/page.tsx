import { getBrandBySlug, getProductsByBrand } from "@/sanity/queries";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import type { Metadata } from "next";
import { Product } from "@/sanity.types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "Brand Not Found" };
  return {
    title: `${brand.title} Products | eKart`,
    description: `Shop all ${brand.title} products on eKart.`,
  };
}

const BrandPage = async ({ params }: Props) => {
  const { slug } = await params;

  const [brand, products] = await Promise.all([
    getBrandBySlug(slug),
    getProductsByBrand(slug),
  ]);

  if (!brand) return notFound();

  return (
    <Container className="py-10 min-h-screen">
      {/* Brand Hero */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 bg-gray-100 rounded-2xl p-8">
        {brand.logo && (
          <div className="bg-white rounded-xl p-5 shadow-sm flex items-center justify-center w-36 h-20 shrink-0">
            <Image
              src={urlFor(brand.logo).width(240).url()}
              alt={brand.title ?? "Brand"}
              width={180}
              height={80}
              className="object-contain w-full h-full"
            />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{brand.title}</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <Package size={14} />
            {products.length} product{products.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No products found for {brand.title}</p>
          <p className="text-sm mt-1">Check back later or browse other brands.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default BrandPage;