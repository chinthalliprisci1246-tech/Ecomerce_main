import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";

const ShopPage = async () => {
  const products = await client.fetch<Product[]>(
    `*[_type == "product"] | order(name asc) {
      _id, name, slug, images, price, stock, status, variant, discount,
      "categories": categories[]->title
    }`
  );

  return (
    <Container className="py-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <p className="text-sm text-gray-500">{products.length} products found</p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-400 py-20">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default ShopPage;

