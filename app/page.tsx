import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/quaries";


 import React from 'react'
 
 const Home = async ()=> {
   const categories = await getCategories(6);
   console.log(categories);
  
  const productType: string[] = [
    "newarrival",
    "bestseller",
    "featured",
  ];
   
  return (
    <Container >
      <div className="bg-amber-100">
      <HomeBanner />
      </div>
      <ProductGrid productType={productType} />
      <HomeCategories categories={categories}/>
      <ShopByBrands />
      <LatestBlog />
    </Container>
  );
 }
 export default Home;
 
 
  


