import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default async function MediaPage() {
  const res = await fetch("http://localhost:3000/api/media/all",{
    cache: "no-store",
  });

  const mediaItems = await res.json();
  console.log("📸 Media Gallery (Direct Fetch):", mediaItems);

  return (
    <div>
      <PageHeader
        title="Media Gallery"
        description="Explore images and videos from our events, projects and activities."
      />

      <div className="container py-16 md:py-24">
        {Array.isArray(mediaItems) && mediaItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {mediaItems.map((item: any) => (
              <Card key={item.id} className="overflow-hidden group rounded-xl shadow-sm">
                <CardContent className="p-0">
                  {/* IMAGE */}
                  {item.mediaType === "IMAGE" && (
                    <div className="aspect-[4/3]">
                      <Image
                        src={item.url.startsWith("http") ? item.url : `http://localhost:3000${item.url}`}
                        alt={item.altText ?? "Gallery image"}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* VIDEO */}
                  {item.mediaType === "VIDEO" && (
                    <div className="aspect-[4/3]">
                      <video
                        controls
                        className="w-full h-full object-cover"
                      >
                        <source
                          src={
                            item.url.startsWith("http")
                              ? item.url
                              : `http://localhost:3000${item.url}`
                          }
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No media items found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
