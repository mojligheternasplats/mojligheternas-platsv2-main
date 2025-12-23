import { PageHeader } from "@/components/shared/PageHeader";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Om oss"
        description="Vi skapar trygga sammanhang och framtidstro för unga."
      />

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT — Sticky Image */}
          <div className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/omOssbild.JPG"
                alt="Möjligheternas Plats – gemenskap och framtidstro"
                width={900}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="space-y-12">

            {/* About */}
            <section className="bg-card rounded-3xl p-8 shadow-sm prose lg:prose-lg max-w-none">
              <p>
                <strong>Möjligheternas Plats</strong> är en ideell organisation
                som sedan 2013 arbetar för att stärka ungas möjligheter att hitta
                sin plats i samhället. Vi startade i Sollentuna med en enkel men
                viktig idé: att unga behöver trygga sammanhang, vuxna som
                lyssnar och konkreta möjligheter att utvecklas.
              </p>
                <br />
              <p>
                Vårt arbete tar sin utgångspunkt i ungas verklighet. Vi möter dem
                där de befinner sig och bygger relationer över tid. Genom trygga
                mötesplatser, stödjande samtal och meningsfulla aktiviteter
                stärker vi självförtroende, ansvar och framtidstro hos unga i
                socioekonomiskt utsatta områden.
              </p>
         <br />
              <p>
                I nära samarbete med kommuner och andra samhällsaktörer
                utvecklar vi verksamheter som svarar mot faktiska behov. Med
                stöd från bland annat Allmänna Arvsfonden har vi nått fler unga
                mellan 16–24 år och stöttat dem i viktiga vägval kring studier,
                arbete och samhällsengagemang.
              </p>
            </section>

            {/* Vision */}
            <section className="bg-secondary rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-4">Vår vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vi vill se ett samhälle där unga ges möjlighet att växa, ta
                ansvar och känna tillhörighet – oavsett bakgrund eller
                livssituation. Genom gemenskap, delaktighet och tillit vill vi
                bidra till ett mer inkluderande samhälle där unga blir en del av
                lösningen.
              </p>
            </section>

            {/* Mission */}
            <section className="bg-secondary rounded-3xl p-8">
              <h2 className="text-3xl font-bold mb-4">Vårt uppdrag</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vårt uppdrag är att skapa trygga rum där unga kan växa och
                utvecklas. Genom stöd, aktiviteter och meningsfulla sammanhang
                stärker vi självkänsla, framtidstro och ansvarstagande. Vi vill
                vara en plats där unga känner sig sedda, hörda och värdefulla.
              </p>
            </section>

            {/* Media */}
            <section className="space-y-8">
              <div className="bg-card rounded-3xl p-6 shadow-sm">
                <p className="mb-3 text-sm text-muted-foreground">
                  Se video
                </p>
                <iframe
                  src="https://www.instagram.com/reel/DQENcrIjWi5/embed"
                  className="w-full aspect-[9/16] rounded-xl"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="bg-card rounded-3xl p-6 shadow-sm">
                <p className="mb-3 text-sm text-muted-foreground">
                  Se inlägg
                </p>
                <iframe
                  src="https://www.instagram.com/p/DC32wKwitjn/embed"
                  className="w-full aspect-[4/5] rounded-xl"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
