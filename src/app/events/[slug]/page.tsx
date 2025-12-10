import { getEvents, getEventBySlug } from "@/lib/api/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/lib/getMediaUrl";
import EventRegisterButton from "@/components/events/EventRegisterButton";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Not Found" };

  return {
    title: event.title,
    description: event.description?.slice(0, 160),
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const image = event?.media?.find((m) => m.mediaType === "IMAGE") ?? null;
  const imageUrl = getMediaUrl(image?.url);
  const eventDate = new Date(event.startDate);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-14">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/events" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Tillbaka</span>
            </Link>
          </Button>
          <span className="text-sm font-semibold hidden sm:inline">Möjligheternas Plats</span>
          <div className="w-8" />
        </div>
      </nav>

      {/* Hero / Feature Section */}
      <section className="relative isolate overflow-hidden bg-primary/90 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute top-0 left-[max(50%,25rem)] h-64 w-[32rem] -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-border"
          >
            <defs>
              <pattern id="event-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#event-pattern)" strokeWidth="0" />
          </svg>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          {/* Text column */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
              
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-card-foreground sm:text-5xl">
                  {event.title}
                </h1>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{eventDate.toLocaleDateString("sv-SE")}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
                {event.description && (
                  <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sticky image column */}
          {imageUrl && (
            <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
              <Image
                src={imageUrl}
                alt={event.title}
                width={800}
                height={600}
                className="w-full max-w-none rounded-xl bg-card shadow-xl ring-1 ring-border"
              />
            </div>
          )}

          {/* Content column */}
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <article className="prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.content ?? "" }} />
              </article>
              <div className="mt-12">
                <EventRegisterButton eventId={event.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
