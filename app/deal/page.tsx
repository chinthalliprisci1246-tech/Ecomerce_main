import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getDealProducts } from "@/sanity/queries";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/sanity.types";

const DealPage = async () => {
  const products = await getDealProducts();

  return (
    <div className="py-10 bg-shop-deal">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1px text-base uppercase tracking-wid">
          Hot Deals of the Week
        </Title>
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products?.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No deals available right now.</p>
        )}
      </Container>
    </div>
  );
};

export default DealPage;
