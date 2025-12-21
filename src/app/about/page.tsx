

import { PageHeader } from "@/components/shared/PageHeader";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
    
      {/* Two-column modern layout */}
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Sticky Image */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/omOssbild.PNG"
                alt="Möjligheternas Plats – gemenskap och framtidstro"
                width={900}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* RIGHT — Scrollable Text */}
          <div className="relative">
            <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-10 scrollbar-thin scrollbar-thumb-muted-foreground/20">

              {/* Intro */}
              <section className="prose lg:prose-lg max-w-none">
                <p>
                  <strong>Möjligheternas Plats</strong> är en ideell organisation
                  som sedan 2013 arbetar för att stärka ungas möjligheter att
                  hitta sin plats i samhället. Vi startade i Sollentuna med en
                  enkel men viktig idé: att unga behöver trygga sammanhang,
                  vuxna som lyssnar och konkreta möjligheter att utvecklas.
                </p>

                <p>
                  Vårt arbete tar sin utgångspunkt i ungas verklighet. Vi möter
                  dem där de befinner sig och bygger relationer över tid. Genom
                  trygga mötesplatser, stödjande samtal och meningsfulla
                  aktiviteter arbetar vi för att stärka självförtroende,
                  ansvar och framtidstro hos unga i socioekonomiskt utsatta
                  områden.
                </p>

                <p>
                  I nära samarbete med kommuner och andra samhällsaktörer
                  utvecklar vi verksamheter som svarar mot faktiska behov. Med
                  stöd från bland annat Allmänna Arvsfonden har vi kunnat nå
                  fler unga mellan 16–24 år och ge dem stöd i viktiga vägval
                  kring studier, arbete och engagemang i samhället. För oss
                  handlar det inte om kortsiktiga insatser, utan om långsiktigt
                  arbete som gör skillnad på riktigt.
                </p>
              </section>

              {/* Vision */}
              <section>
                <h2 className="text-3xl font-bold mb-4">Vår vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Vi vill se ett samhälle där unga ges möjlighet att växa, ta
                  ansvar och känna tillhörighet – oavsett bakgrund eller
                  livssituation. Genom gemenskap, delaktighet och tillit vill
                  vi bidra till ett mer inkluderande samhälle där unga inte
                  lämnas utanför, utan blir en del av lösningen.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
