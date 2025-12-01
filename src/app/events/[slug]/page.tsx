import { getEvents, getEventBySlug } from "@/lib/api/events";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
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

export default async function EventDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const image = event?.media?.find((m) => m.mediaType === "IMAGE") ?? null;
  const imageUrl = getMediaUrl(image?.url);

  const eventDate = new Date(event.startDate);

  return (
    <div className="min-h-screen bg-background">

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
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

          <div className="w-8" /> {/* Balances layout */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-10 md:py-16">
        <div className="container max-w-3xl mx-auto space-y-6">

          {/* Image */}
          {imageUrl && (
            <div className="relative h-60 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-md">
              <Image
                src={imageUrl}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          )}

          {/* Title & Meta */}
          <header className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground">
              {event.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
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
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            )}
          </header>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 md:py-16">
        <div className="container max-w-3xl mx-auto">
          <article className="prose prose-base sm:prose-lg lg:prose-xl dark:prose-invert max-w-none">
            <div
              className="space-y-6"
              dangerouslySetInnerHTML={{ __html: event.content ?? "" }}
            />
          </article>

          <div className="mt-12 text-center">
            <EventRegisterButton eventId={event.id} />
          </div>
        </div>
      </section>

    </div>
  );
}
