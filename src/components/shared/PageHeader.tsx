// src/components/shared/PageHeader.tsx
import React from "react";

type PageHeaderProps = {
  title: string; // HTML or plain string
  description?: string;
  backgroundImage?: string;
  fallbackImage?: string;
};

export function PageHeader({
  title,
  description,
  backgroundImage,
  fallbackImage = "/image/default-header.png",
}: PageHeaderProps) {
  const imageToUse = backgroundImage || fallbackImage;

  return (
    <header
      className={`
        relative py-20 md:py-28 text-center
        ${imageToUse ? "bg-cover bg-center bg-no-repeat" : "bg-secondary"}
      `}
      style={imageToUse ? { backgroundImage: `url(${imageToUse})` } : undefined}
    >
      {imageToUse && <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />}

      <div className="relative container">
        {/* ✅ Render HTML safely */}
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-white font-headline drop-shadow-lg"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {description && (
          <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto drop-shadow">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}
