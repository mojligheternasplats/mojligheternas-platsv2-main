import { getEvents, getEventBySlug } from '@/lib/api/events';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getMediaUrl } from "@/lib/getMediaUrl";
import EventRegisterButton  from "@/components/events/EventRegisterButton";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const event = await getEventBySlug(params.slug);
    if (!event) {
        return { title: 'Not Found' };
    }
    return {
        title: event.title,
        description: event.description,
    };
}

export default async function EventDetailPage(props: { params: Promise<{ slug: string }> }) {


  const { slug } = await props.params;
  const event = await getEventBySlug(slug);
  if (!event) {
    notFound();
  }

    const image = event?.media?.find((m) => m.mediaType === "IMAGE") ?? null;
  const imageUrl = getMediaUrl(image?.url);
  return (
    <div className="container max-w-4xl mx-auto py-12 md:py-20">
       <Link href="/events" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
        <ArrowLeft size={16} />
        Back to Events
      </Link>
      <article>
        <header className="mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
            {event.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <time dateTime={event.createdAt}>{formatDate(event.createdAt)}</time>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </header>

         {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={event.title}
                  width={600}
                  height={400}
                />
              )}

        <div
          className="prose dark:prose-invert lg:prose-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: event.content ?? '' }}
        />

      <div className="mt-12 text-center">
    <EventRegisterButton eventId={event.id} />
</div>
      </article>
    </div>
  );
}
