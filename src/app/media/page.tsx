import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getMediaClient } from "@/lib/api/media";

type MediaItem = {
  id: string;
  url: string;
  mediaType: "IMAGE" | "VIDEO";
  altText?: string | null;
  createdAt: string;
};

export default async function MediaPage() {
  const mediaItems: MediaItem[] = await getMediaClient();

  const sortedMedia = [...mediaItems].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return (
    <div>
      <PageHeader
        title="Media Gallery"
        description="Explore images and videos from our events, projects and activities."
      />

      <div className="container py-16 md:py-24">
        {sortedMedia.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedMedia.map((item, index) => {
              const shape =
                index % 3 === 0
                  ? "aspect-[4/3]"
                  : index % 3 === 1
                  ? "aspect-[3/4]"
                  : "aspect-square";

              return (
                <Card
                  key={item.id}
                  className="border-0 bg-transparent shadow-none"
                >
                  <CardContent className="p-0 bg-transparent">
                    {/* IMAGE */}
                    {item.mediaType === "IMAGE" && (
                      <div
                        className={`relative ${shape} overflow-hidden rounded-2xl group`}
                      >
                        <Image
                          src={item.url}
                          alt={item.altText || "Gallery image"}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* VIDEO */}
                    {item.mediaType === "VIDEO" && (
                      <div
                        className={`relative ${shape} overflow-hidden rounded-2xl`}
                      >
                        <video
                          controls
                          className="w-full h-full object-cover"
                        >
                          <source src={item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-lg text-muted-foreground">
              No media items found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
