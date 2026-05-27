// app/search/page.tsx
"use client";
import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";

// Skeleton card shown while results are loading
const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-md bg-white animate-pulse">
    <div className="w-full h-64 bg-gray-200 rounded-t-md" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-8 bg-gray-200 rounded-full mt-1" />
    </div>
  </div>
);

const SEARCH_QUERY = `
  *[_type == "product" && name match $q] {
    _id, name, slug, images, price, stock, status, variant, discount,
    "categories": categories[]->title
  }
`;

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setLoading(true);
      setSearched(true);
      try {
        const data = await client.fetch<Product[]>(SEARCH_QUERY, {
          q: `*${query.trim()}*`,
        });
        setResults(data);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  return (
    <Container className="py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Search Products
      </h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="flex-1 border rounded-full px-5 py-3 text-sm outline-none focus:border-shop-dark-green transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-shop-dark-green text-white px-6 py-3 rounded-full flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          <Search size={16} />
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Skeleton grid while loading */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* No results */}
      {!loading && searched && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
          <Search size={40} strokeWidth={1} />
          <p className="text-base font-medium">
            No products found for &quot;{query}&quot;
          </p>
          <p className="text-sm">Try a different keyword.</p>
        </div>
      )}

      {/* Results */}
      {!loading && results.length > 0 && (
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