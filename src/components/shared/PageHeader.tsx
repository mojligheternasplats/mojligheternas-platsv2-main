import React from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  backgroundImage?: string;
  fallbackImage?: string; // NEW
};

export function PageHeader({
  title,
  description,
  backgroundImage,
  fallbackImage = "/image/default-header.png", // Default fallback
}: PageHeaderProps) {
  const imageToUse = backgroundImage || fallbackImage;

  return (
    <header
      className={`
        relative py-20 md:py-28 text-center
        ${imageToUse ? "bg-cover bg-center bg-no-repeat" : "bg-secondary"}
      `}
      style={
        imageToUse
          ? { backgroundImage: `url(${imageToUse})` }
          : undefined
      }
    >
      {/* Dark overlay for readability */}
      {imageToUse && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      )}

      <div className="relative container">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-headline drop-shadow-lg">
          {title}
        </h1>

        {description && (
          <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto drop-shadow">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
