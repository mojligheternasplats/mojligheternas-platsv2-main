// src/components/shared/PageHeader.tsx
import React from "react";

type PageHeaderProps = {
  title: string; // HTML or plain string
  description?: string;
  backgroundImage?: string;
  fallbackImage?: string;
  sstyle?: React.CSSProperties;
};

export function PageHeader({
  title,
  description,
  backgroundImage,
  fallbackImage = "/images/localProjectbild.PNG",
}: PageHeaderProps) {
  const imageToUse = backgroundImage || fallbackImage;

  return (
    <header
  className={`
    relative py-20 md:py-28 text-center
    ${imageToUse ? "bg-cover bg-center object-cover " : "bg-secondary"}
  `}
  style={imageToUse ? { backgroundImage: `url(${imageToUse})` } : undefined}
>
  {/* Overlay */}
  {imageToUse && <div className="absolute inset-0 full bg-black/50 backdrop-blur-[1px]" />}

  {/* Content */}
  <div className="relative container">
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
