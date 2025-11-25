'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Fullscreen, Lightbulb, Users, Heart, Target } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Article, Event, Media } from '@/lib/definitions';
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, useState } from 'react';
import { getNewsClient } from '@/lib/api/news';
import { getEventsClient } from '@/lib/api/events';
import { getMediaClient } from '@/lib/api/media';
import { getMediaUrl } from "@/lib/getMediaUrl";
import { getHeroClient } from "@/lib/api/hero";
import { YouthTestimonial } from '@/lib/definitions'
import { getTestimonialsClient } from '@/lib/api/testimonials';
import { TestimonialCard } from '../components/testimonials/TestimonialCard';
import MediaPreview from '@/components/MediaPreview';




export default function Home() {
  const { t } = useTranslation();
  const [latestNews, setLatestNews] = useState<Article[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [hero, setHero] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<YouthTestimonial[]>([]);

  useEffect(() => {
    async function fetchData() {
      const news = await getNewsClient();
      setLatestNews(news.slice(0, 3));

      const events = await getEventsClient();
      setUpcomingEvents(events.slice(0, 2));

      const media = await getMediaClient();
      setMediaItems(media.slice(0, 10));

      const heroData = await getHeroClient("home");

      const testimonials = await getTestimonialsClient();
      setTestimonials(testimonials);
      console.log(testimonials)
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="hero"
          className="
    relative flex items-center overflow-hidden bg-background text-foreground
    min-h-[80vh] md:min-h-screen
    pt-20 md:pt-32
  "
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/40 to-background z-0" />

          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={hero?.media?.[0]?.url || "/herofallbacke.jpg"}
              alt="Hero background"
              fill
              sizes="100vw"
              className="object-cover opacity-60 md:opacity-40"
              priority
            />
          </div>

          {/* CONTENT */}
          <div
            className="
      relative z-10 w-full mx-auto
      px-4 sm:px-6 lg:px-8
      py-16 sm:py-24 md:py-32
      text-center
      max-w-3xl md:max-w-4xl lg:max-w-6xl
    "
          >
            {/* Title */}
            <h1
              className="
        font-bold drop-shadow-xl
        text-3xl sm:text-4xl md:text-6xl lg:text-7xl
        leading-tight sm:leading-snug md:leading-tight
        mb-6
      "
              dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
            />

            {/* Subtitle */}
            <p
              className="
        text-base sm:text-lg md:text-2xl 
        text-muted-foreground 
        max-w-xl sm:max-w-2xl md:max-w-3xl 
        mx-auto leading-relaxed drop-shadow-md
        mb-8 sm:mb-10 md:mb-12
      "
            >
              {t("home.hero.subtitle")}
            </p>

            {/* Buttons */}
            <div
              className="
        flex flex-col sm:flex-row gap-4 justify-center
        w-full max-w-sm sm:max-w-none mx-auto
      "
            >
              <Button
                asChild
                size="lg"
                className="
          bg-primary text-primary-foreground hover:bg-primary/90
          transition-all px-6 sm:px-8 py-3
          text-base sm:text-lg shadow-lg
        "
              >
                <Link href="/projects">
                  {t("home.hero.exploreProjects")}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="
          border-primary text-primary 
          hover:bg-primary hover:text-primary-foreground
          transition-all px-6 sm:px-8 py-3
          text-base sm:text-lg shadow-lg
        "
              >
                <Link href="/contact">{t("home.hero.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Vision Section */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{t('home.vision.title.part1')} <span className="text-primary">{t('home.vision.title.part2')}</span></h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{t('home.vision.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="flex flex-col gap-6 py-6 text-center items-center">
                <CardHeader className="items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{t('home.vision.card1.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('home.vision.card1.description')}</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col gap-6 py-6 text-center items-center">
                <CardHeader className="items-center">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <CardTitle>{t('home.vision.card2.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('home.vision.card2.description')}</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col gap-6 py-6 text-center items-center">
                <CardHeader className="items-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{t('home.vision.card3.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t('home.vision.card3.description')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        {/* Featured News Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{t('home.latestNews.title')}</h2>
              <p className="text-muted-foreground mt-2">{t('home.latestNews.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestNews.map((article: Article) => (
                <Card key={article.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/news/${article.slug}`} className="block">
                    {article.media.map((imgSrc, index) => {
                      const imageUrl = getMediaUrl(imgSrc.url);
                      return (
                        <Image
                          key={index}
                          src={imageUrl ?? '/image/log.png'}
                          alt={article.title}
                          width={500}
                          height={200}
                          className="object-cover rounded"
                        />
                      );
                    })}
                  </Link>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">
                      <Link href={`/news/${article.slug}`} className="hover:text-accent transition-colors">
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{formatDate(article.publishedDate)}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{article.description}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 h-auto text-accent">
                      <Link href={`/news/${article.slug}`}>
                        {t('common.readMore')} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}

            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/news">{t('home.latestNews.viewAll')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Youth Testimonials Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Users className="mx-auto h-10 w-10 text-primary mb-4" />
              <span></span>
              {`${t('home.testimonialcard.title.part1')}${t('home.testimonialcard.title.part2')}${t('home.testimonialcard.title.part3')}`}


              <p className="text-muted-foreground mt-2">
                {t('home.testimonialcard.description')}
              </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Media Preview Section */}
       <MediaPreview mediaItems={mediaItems} />


        {/* Upcoming Events Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{t('home.events.title')}</h2>
              <p className="text-muted-foreground mt-2">{t('home.events.subtitle')}</p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="shadow-md hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/events/${event.slug}`}>
                    <div className="grid md:grid-cols-[1fr_3fr] items-center">
                      <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                        <p className="text-4xl font-bold font-headline">{new Date(event.createdAt).getDate()}</p>
                        <p className="text-lg">{new Date(event?.createdAt).toLocaleString('default', { month: 'short' }).toUpperCase()}</p>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold font-headline text-primary hover:text-accent transition-colors">{event.title}</h3>
                        <p className="text-muted-foreground mt-1">{event.location}</p>
                        <p className="text-sm mt-2">{event.description}</p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/events">{t('home.events.viewAll')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-accent mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{t('home.cta.title')}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/engage">{t('home.cta.button')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
