"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import HomeTabBar from "./HomeTabBar";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { Product } from "@/sanity.types";

interface Props {
  productType: string[];
}

const ProductGrid: React.FC<Props> = ({ productType }) => {

  const [selectedTab, setSelectedTab] = useState<string>(
    productType[0] ?? ""
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedTab) return;

    const fetchProducts = async () => {
      setLoading(true);

      try {

        const query = `
          *[_type == "product" && variant == $variant]{
            _id,
            name,
            images,
            stock,
            price,
            categories,
            status
          }
        `;

        const response = await client.fetch<Product[]>(query, {
          variant: selectedTab,
        });

        setProducts(response);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, [selectedTab]);

  return (
    <div className="mt-10">

      <HomeTabBar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        productType={productType}
      />

      {loading ? (

        <div className="text-center py-10">
          Loading products...
        </div>

      ) : products.length > 0 ? (

        <div className="grid grid-cols-3 md:grid-cols-5 gap-5 mt-10">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      ) : (

        <NoProductAvailable selectedTab={selectedTab} />

      )}

    </div>
  );
};

export default ProductGrid;
