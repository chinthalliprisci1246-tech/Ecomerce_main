import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getDealProducts } from "@/sanity/quaries";
import ProductCard from "@/components/ProductCard";

const DealPage = async () => {
  const products = await getDealProducts();

  return (
    <div className="py-10 bg-shop-deal">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-1px text-base uppercase tracking-wid">
          Hot Deals of the Week
        </Title>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
