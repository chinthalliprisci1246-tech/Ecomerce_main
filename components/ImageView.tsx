"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useState } from "react";
import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";

interface ImageType {
  asset: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  _type: "image";
  _key: string;
}

interface Props {
  images?: ImageType[];
  isStock?: number;
}

const ImageView = ({ images = [], isStock }: Props) => {
  // ✅ Fix: active is ImageType not array
  const [active, setActive] = useState<ImageType | null>(images[0] ?? null);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center min-h-96">
        {active ? (
          <Image
            src={urlFor(active).url()}
            alt="Product Image"
            width={700}
            height={700}
            priority
            className={`w-full h-96 object-contain hoverEffect ${
              isStock === 0 ? "opacity-50" : ""
            }`}
          />
        ) : (
          <p className="text-gray-400 text-sm">No image available</p>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((image) => (
            <button
              key={image._key}
              onClick={() => setActive(image)}
              className={`border-2 rounded-md overflow-hidden w-16 h-16 transition-all ${
                active?._key === image._key
                  ? "border-shop-dark-green opacity-100"
                  : "border-gray-200 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={urlFor(image).url()}
                alt="Thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageView;
