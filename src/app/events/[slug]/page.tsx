import { getEvents, getEventBySlug } from "@/lib/api/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/lib/getMediaUrl";
import EventRegisterButton from "@/components/events/EventRegisterButton";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Await params ONCE
  const { slug } = await params;

  const event = await getEventBySlug(slug);
  if (!event) notFound();

     console.log(event)
  // ✅ Always get the LATEST image
  const images = event.media?.filter(
    (m) => m.mediaType === "IMAGE"
  );

  const image = images?.[images.length - 1] ?? null;
  const imageUrl = image ? getMediaUrl(image.url) : null;

  const eventDate = new Date(event.startDate);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/events" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Tillbaka</span>
            </Link>
          </Button>
          <span className="text-sm font-semibold hidden sm:inline">
            Möjligheternas Plats
          </span>
          <div className="w-8" />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {eventDate.toLocaleDateString("sv-SE")}
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
              )}
            </div>

            {event.description && (
              <p className="mt-6 text-lg text-muted-foreground">
                {event.description}
              </p>
            )}
          </div>

          {/* Image */}
          {imageUrl && (
            <div className="relative h-[420px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={event.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="container max-w-3xl mx-auto mt-16">
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: event.content ?? "" }} />
          </article>

          <div className="mt-12">
  {event.openForRegistration ? (
    <EventRegisterButton eventId={event.id} />
  ) : (
    <p className="text-sm text-muted-foreground">
      Registreringen för detta evenemang är stängd.
    </p>
  )}
</div>

        </div>
      </section>
    </div>
  );
}
