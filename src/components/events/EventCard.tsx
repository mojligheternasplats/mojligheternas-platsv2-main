import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import type { Event } from '@/lib/definitions';
import { formatDate } from '@/lib/utils';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.startDate);

  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/events/${event.slug}`} className="block">
        <div className="bg-primary text-primary-foreground p-6 flex items-center gap-4">
            <div className="text-center">
                <p className="text-4xl font-bold font-headline">{eventDate.getDate()}</p>
                <p className="text-lg">{eventDate.toLocaleString('default', { month: 'short' }).toUpperCase()}</p>
            </div>
            <div>
                 <CardTitle className="font-headline text-2xl text-primary-foreground leading-tight">
                    {event.title}
                </CardTitle>
            </div>
        </div>
      </Link>
      <CardContent className="pt-6 flex-grow">
        <div className="flex items-center text-muted-foreground text-sm mb-4">
            <MapPin className="h-4 w-4 mr-2"/>
            {event.location}
        </div>
        <p className="text-muted-foreground line-clamp-4">{event.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-accent font-semibold">
          <Link href={`/events/${event.slug}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
