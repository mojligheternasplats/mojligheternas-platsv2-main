import { getEvents } from '@/lib/api/events';
import { EventCard } from '@/components/events/EventCard';
import { PageHeader } from '@/components/shared/PageHeader';

export default async function EventsListPage() {
  const events = await getEvents();

  return (
    <div>
      <PageHeader
        title="Events & Workshops"
        description="Join our upcoming seminars, camps, and community gatherings."
      />
      <div className="container py-16 md:py-24">
        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg text-muted-foreground">No upcoming events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
