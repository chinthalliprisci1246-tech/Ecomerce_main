import { getProductBySlug } from '@/sanity/quaries';
import Container from '@/components/Container';
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import AddToButtonCart from '@/components/AddToButtonCart';
import { notFound } from 'next/navigation';
import { StarIcon, ShieldCheck, RotateCcw, Truck } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const reviews = [
    { name: "Rahul M.", rating: 5, comment: "Excellent product! Highly recommended.", date: "Jan 12, 2025" },
    { name: "Priya S.", rating: 4, comment: "Good quality, fast delivery.", date: "Feb 3, 2025" },
    { name: "Arun K.", rating: 4, comment: "Worth the price. Very satisfied.", date: "Mar 18, 2025" },
  ];

  return (
    <Container className="py-10">

      {/* Top Section — Image + Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left — Images */}
        <ImageView images={product?.images ?? []} isStock={product?.stock} />

        {/* Right — Details */}
        <div className="flex flex-col gap-5">

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={16}
                  fill={i < 4 ? "#93D991" : "#e5e7eb"}
                  className={i < 4 ? "text-shop-light-green" : "text-gray-200"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviews.length} Reviews)</span>
          </div>

          {/* Price */}
          <PriceView price={product?.price} discount={product?.discount} className="text-xl" />

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-700">Availability:</span>
            <span className={product?.stock > 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
              {product?.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          {product?.description && (
            <p className="text-gray-600 text-sm leading-relaxed border-t pt-4">
              {product.description}
            </p>
          )}

          {/* Category */}
          {product?.categories && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="text-gray-500 uppercase">{product.categories.join(", ")}</span>
            </div>
          )}

          {/* Add to Cart */}
          <AddToButtonCart product={product} className="w-full rounded-full py-3 text-base mt-2" />

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
        <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

        <div className="flex flex-col gap-5">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-5 flex flex-col gap-2">
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
                      className={i < review.rating ? "text-shop-light-green" : "text-gray-200"}
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
