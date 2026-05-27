// app/product/[slug]/page.tsx
import { getProductBySlug } from "@/sanity/quaries";
import Container from "@/components/Container";
import ImageView from "@/components/ImageView";
import PriceView from "@/components/PriceView";
import AddToButtonCart from "@/components/AddToButtonCart";
import { notFound } from "next/navigation";
import { StarIcon, ShieldCheck, RotateCcw, Truck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

// Deterministic pseudo-random number from a string seed
function seededRandom(seed: string, index: number): number {
  let hash = 0;
  const str = seed + index;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
}

function generateReviews(productId: string) {
  const names = [
    "Aarav S.", "Priya M.", "Rahul K.", "Sneha R.", "Vikram T.",
    "Divya N.", "Arjun P.", "Meera L.", "Karan B.", "Ananya V.",
  ];
  const comments = [
    "Really impressed with the quality. Will buy again!",
    "Fast shipping and exactly as described.",
    "Great value for money. Highly recommend.",
    "Solid build quality and looks premium.",
    "Exceeded my expectations. Very happy with this purchase.",
    "Good product, packaging could be better.",
    "Excellent! My family loved it.",
    "Works perfectly. No complaints at all.",
  ];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const count = 3 + Math.floor(seededRandom(productId, 0) * 3); // 3–5 reviews
  return Array.from({ length: count }, (_, i) => {
    const nameIdx = Math.floor(seededRandom(productId, i + 1) * names.length);
    const commentIdx = Math.floor(seededRandom(productId, i + 10) * comments.length);
    const rating = 3 + Math.floor(seededRandom(productId, i + 20) * 3); // 3–5 stars
    const month = months[Math.floor(seededRandom(productId, i + 30) * 12)];
    const day = 1 + Math.floor(seededRandom(productId, i + 40) * 27);
    return {
      name: names[nameIdx],
      rating,
      comment: comments[commentIdx],
      date: `${month} ${day}, 2025`,
    };
  });
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const reviews = generateReviews(product._id);
  const avgRating =
    Math.round(
      (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10
    ) / 10;

  return (
    <Container className="py-10">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left — Images */}
        <ImageView images={product?.images ?? []} isStock={product?.stock} />

        {/* Right — Details */}
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>

          {/* Rating summary */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  fill={i < Math.round(avgRating) ? "#93D991" : "#e5e7eb"}
                  className={
                    i < Math.round(avgRating)
                      ? "text-shop-light-green"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {avgRating} ({reviews.length} Reviews)
            </span>
          </div>

          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-xl"
          />

          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">Availability:</span>
            <span
              className={
                product?.stock > 0
                  ? "text-green-600 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {product?.stock > 0
                ? `In Stock (${product.stock} left)`
                : "Out of Stock"}
            </span>
          </div>

          {product?.description && (
            <p className="text-gray-600 text-sm leading-relaxed border-t pt-4">
              {product.description}
            </p>
          )}

          {product?.categories && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="text-gray-500 uppercase">
                {product.categories.join(", ")}
              </span>
            </div>
          )}

          <AddToButtonCart
            product={product}
            className="w-full rounded-full py-3 text-base mt-2"
          />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 border-t pt-4 mt-2">
            <div className="flex flex-col items-center text-center gap-1 text-xs text-gray-500">
              <Truck size={20} className="text-shop-dark-green" />
              <span>Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1 text-xs text-gray-500">
              <RotateCcw size={20} className="text-shop-dark-green" />
              <span>Easy Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1 text-xs text-gray-500">
              <ShieldCheck size={20} className="text-shop-dark-green" />
              <span>Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t pt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Customer Reviews
          </h2>
          <span className="text-sm text-gray-500">
            {avgRating} out of 5 · {reviews.length} reviews
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      size={14}
                      fill={i < review.rating ? "#93D991" : "#e5e7eb"}
                      className={
                        i < review.rating
                          ? "text-shop-light-green"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;