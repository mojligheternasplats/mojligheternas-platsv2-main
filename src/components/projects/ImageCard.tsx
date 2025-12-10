import React from "react";
import Image from "next/image";

type ImageCardProps = {
  backgroundImage?: string;
  fallbackImage?: string;
};

export function ImageCard({
  backgroundImage,
  fallbackImage = "/fallback.png",
}: ImageCardProps) {
  
  // Ensure image is always a valid string
  const imageToUse =
    backgroundImage && backgroundImage.startsWith("/")
      ? backgroundImage
      : fallbackImage;

  return (
    <div className="relative w-full max-w-xl rounded-xl shadow-xl ring-1 ring-border overflow-hidden">
      <Image
        src={imageToUse}
        alt="Project image"
        width={800}
        height={600}
        className="w-full h-auto object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
