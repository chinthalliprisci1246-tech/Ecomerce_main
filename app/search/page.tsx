"use client";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { Search } from "lucide-react";
import { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const data = await client.fetch<Product[]>(
        `*[_type == "product" && name match $q] {
          _id, name, slug, images, price, stock, status, variant, discount,
          "categories": categories[]->title
        }`,
        { q: `*${query}*` }
      );
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Search Products</h1>
      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 border rounded-full px-5 py-3 text-sm outline-none focus:border-shop-dark-green transition"
        />
        <button type="submit" className="bg-shop-dark-green text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition">
          <Search size={16} /> Search
        </button>
      </form>
      {loading ? (
        <p className="text-center text-gray-400 py-10">Searching...</p>
      ) : searched && results.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No products found for "{query}"</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {results.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default SearchPage;