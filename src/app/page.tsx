/** 
 * NEXT-LEVEL PROFESSIONAL + ALIVE HOMEPAGE
 * - animated hero 
 * - gradient separators 
 * - premium card styling 
 * - soft depth and motion 
 * - improved spacing + rhythm 
 * - modernized section structure 
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Heart,
  Target,
  Lightbulb,
} from "lucide-react";

import { formatDate } from "@/lib/utils";
import type { Article, Event, Media, Partner } from "@/lib/definitions";
import { useTranslation } from "@/hooks/useTranslation";
import { useEffect, useState } from "react";
import { getNewsClient } from "@/lib/api/news";
import { getEventsClient } from "@/lib/api/events";
import { getMediaClient } from "@/lib/api/media";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { getHeroClient } from "@/lib/api/hero";
import { YouthTestimonial } from "@/lib/definitions";
import { getTestimonialsClient } from "@/lib/api/testimonials";
import { TestimonialCard } from "../components/testimonials/TestimonialCard";
import MediaPreview from "@/components/MediaPreview";
import PartnerPreviewSection from "@/components/PartnerPreviewSection";

// ✨ Fade-in animation utility
const fadeIn = "opacity-0 translate-y-8 animate-fade-in";

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
      setHero(heroData);

      const testimonials = await getTestimonialsClient();
      setTestimonials(testimonials);
   

    }
    fetchData(); 
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
     
        {/* 🔥 HERO SECTION — ALIVE + MODERN */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden">
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-20" />

  {/* CONTENT WRAPPER */}
  <div className="relative z-10 mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* LEFT — TEXT */}
    <div className="text-center md:text-left">
      <h1
        className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-xl mb-6"
        dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
      />

      <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed mb-8">
        {t("home.hero.subtitle")}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Button
          size="lg"
          asChild
          className="px-8 py-4 text-lg shadow-xl hover:scale-105 transition-transform"
        >
          <Link href="/projects">
            {t("home.hero.exploreProjects")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          asChild
          className="px-8 py-4 text-lg border-primary hover:bg-primary hover:text-primary-foreground shadow-xl hover:scale-105 transition-transform"
        >
          <Link href="/contact">{t("home.hero.contactUs")}</Link>
        </Button>
      </div>
    </div>

    {/* RIGHT — IMAGE */}
    <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
      <Image
        src={hero?.media?.[0]?.url || "/herofallbacke.jpg"}
        alt="Hero image"
        fill
        priority
        className="object-cover"
      />

      {/* Optional overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
    </div>
  </div>

  {/* Bottom fade */}
  <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent z-0" />
</section>


        {/* Inspiration Line + Curved Divider */}
        <section className="relative w-full bg-background py-16 text-center overflow-hidden">
          {/* Animated Inspiration Text */}
          <p
            className="
      text-lg md:text-2xl font-headline font-semibold
      text-primary tracking-wide mb-8
      animate-in slide-in-from-right-10 fade-in-0 duration-700
    "
          >
            Möjligheternas Plats – Där unga växer, drömmer och bygger sin framtid
          </p>

          {/* Curved Divider with Gradient */}
          <div className="absolute bottom-0 left-0 w-full leading-[0]">
            <svg
              className="relative block w-full h-24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="mplatsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8BD4D9" />
                  <stop offset="50%" stopColor="#F9D65C" />
                  <stop offset="100%" stopColor="#AAC4CF" />
                </linearGradient>
              </defs>

              <path
                fill="url(#mplatsGradient)"
                d="
          M0,64 
          L48,80 
          C96,96,192,128,288,138.7 
          C384,149,480,139,576,112 
          C672,85,768,43,864,53.3 
          C960,64,1056,128,1152,154.7 
          C1248,181,1344,171,1392,165.3 
          L1440,160 
          L1440,320 
          L0,320 
          Z
        "
              />
            </svg>
          </div>
        </section>



        {/* ------------------------------ */}
        {/* 🌟 VISION SECTION — ICONS + DEPTH */}
        {/* ------------------------------ */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 max-w-6xl">

            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
                {t("home.vision.title.part1")}{" "}
                <span className="text-primary">{t("home.vision.title.part2")}</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t("home.vision.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">

              {/* Card 1 */}
              <Card className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white">
                <div className="mx-auto w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold mb-2 text-center">
                  {t("home.vision.card1.title")}
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  {t("home.vision.card1.description")}
                </p>
              </Card>

              {/* Card 2 */}
              <Card className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white">
                <div className="mx-auto w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl font-bold mb-2 text-center">
                  {t("home.vision.card2.title")}
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  {t("home.vision.card2.description")}
                </p>
              </Card>

              {/* Card 3 */}
              <Card className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white">
                <div className="mx-auto w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-bold mb-2 text-center">
                  {t("home.vision.card3.title")}
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  {t("home.vision.card3.description")}
                </p>
              </Card>

            </div>
          </div>
        </section>
    <PartnerPreviewSection />


        {/* ------------------------------ */}
        {/* 📰 LATEST NEWS — PREMIUM CARDS */}
        {/* ------------------------------ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">

            <div className="text-center mb-14">
              <h2 className="text-4xl font-headline font-bold text-primary">
                {t("home.latestNews.title")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {t("home.latestNews.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {latestNews.map((article) => (
                <Card
                  key={article.id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <Link href={`/news/${article.slug}`}>
                    {article.media[0] && (
                      <Image
                        src={getMediaUrl(article.media[0].url) || "/image/log.png"}
                        alt={article.title}
                        width={600}
                        height={350}
                        className="object-cover h-48 w-full"
                      />
                    )}
                  </Link>

                  <CardHeader>
                    <CardTitle className="font-headline text-xl hover:text-accent transition-colors">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </CardTitle>
                    <CardDescription>
                      {formatDate(article.publishedDate)}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {article.description}
                    </p>
                  </CardContent>

                  <div className="px-6 pb-6">
                    <Button variant="link" asChild className="text-accent p-0">
                      <Link href={`/news/${article.slug}`}>
                        {t("common.readMore")}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/news">{t("home.latestNews.viewAll")}</Link>
              </Button>
            </div>

          </div>
        </section>


        {/* ------------------------------ */}
        {/* 👦 TESTIMONIALS — ALIVE CARDS */}
        {/* ------------------------------ */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h2 className="text-4xl font-headline font-bold mb-4">
                {t("home.testimonialcard.title.part1")}
                {t("home.testimonialcard.title.part2")}
                {t("home.testimonialcard.title.part3")}
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                {t("home.testimonialcard.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>


        {/* ------------------------------ */}
        {/* 📸 MEDIA PREVIEW */}
        {/* ------------------------------ */}
        <MediaPreview mediaItems={mediaItems} />


        {/* ------------------------------ */}
        {/* 📅 UPCOMING EVENTS */}
        {/* ------------------------------ */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-headline font-bold text-primary">
                {t("home.events.title")}
              </h2>
              <p className="text-muted-foreground mt-2">
                {t("home.events.subtitle")}
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid gap-10">
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <Link href={`/events/${event.slug}`}>
                    <div className="grid md:grid-cols-[1fr_3fr]">
                      {/* Date block */}
                      <div className="bg-primary text-primary-foreground p-6 text-center md:rounded-l-xl">
                        <p className="text-4xl font-bold font-headline">
                          {new Date(event.startDate).getDate()}
                        </p>
                        <p className="text-lg uppercase">
                          {new Date(event.startDate).toLocaleString("default", {
                            month: "short",
                          })}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="p-6">
                        <h3 className="text-xl font-headline font-bold text-primary hover:text-accent transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {event.location}
                        </p>
                        <p className="text-sm mt-2 line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline">
                <Link href="/events">{t("home.events.viewAll")}</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* ------------------------------ */}
        {/* 💡 FINAL CTA */}
        {/* ------------------------------ */}
        <section className="py-20 bg-background text-center">
          <Lightbulb className="mx-auto h-14 w-14 text-accent mb-6" />
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            {t("contact.subtitle")}
          </p>
          <Button size="lg" asChild className="px-10 py-4 text-lg shadow-xl hover:scale-105 transition-transform">
            <Link href="/engage">{t("nav.contact")}</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
