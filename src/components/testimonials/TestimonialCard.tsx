import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { YouthTestimonial } from '@/lib/definitions';
import { Quote } from 'lucide-react';

type TestimonialCardProps = {
  testimonial: YouthTestimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex flex-col h-full bg-card shadow-lg overflow-hidden">
      <CardContent className="p-6 flex flex-col flex-grow">
        <Quote className="w-8 h-8 text-primary mb-4" />
        <p className="text-muted-foreground flex-grow">
          &ldquo;{testimonial.message}&rdquo;
        </p>
        <div className="flex items-center mt-6">
          <Avatar className="h-12 w-12 mr-4">
            <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}, {testimonial.age}</p>
            <p className="text-sm text-accent">{testimonial.program}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}