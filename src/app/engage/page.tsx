import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Briefcase, Handshake, Mic } from 'lucide-react';

const engagementOptions = [
  {
    icon: Briefcase,
    title: 'Careers',
    description: 'Join our team of innovators and help us build the future of data. We are always looking for talented individuals.',
    link: '/contact',
    linkText: 'View Open Positions',
  },
  {
    icon: Handshake,
    title: 'Partnerships',
    description: 'Collaborate with us on research projects, co-host events, or become a corporate sponsor.',
    link: '/partners',
    linkText: 'Learn about Partnering',
  },
  {
    icon: Mic,
    title: 'Events',
    description: 'Participate in our workshops, camps, and open sessions to learn, network, and share your knowledge.',
    link: '/events',
    linkText: 'See Upcoming Events',
  },
];

export default function EngagePage() {
  return (
    <div>
      <PageHeader
        title="Get Involved"
        description="There are many ways to connect and collaborate with DataFlow Architect. Find the one that's right for you."
      />
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-8">
          {engagementOptions.map((option) => (
            <Card key={option.title} className="flex flex-col text-center items-center p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-accent text-accent-foreground rounded-full p-4 mb-6">
                <option.icon className="h-8 w-8" />
              </div>
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-2xl">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-4 flex-grow">
                <CardDescription>{option.description}</CardDescription>
              </CardContent>
              <div className="mt-6">
                <Button asChild>
                  <Link href={option.link}>
                    {option.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
