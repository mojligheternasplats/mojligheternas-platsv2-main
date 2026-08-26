'use client';

import Link from 'next/link';
import { navigationRoutes } from '@/lib/routes';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="h-15 w-8">
        <img
          src="/images/mplog.png"
          alt="Logo"
          className="h-full w-full"
        />
      </span>

      <span className="font-bold text-xl font-headline text-foreground">
        Möjligheternas Plats
      </span>
    </Link>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const routes = navigationRoutes(t as any);

  const mainRoutes = routes.filter(
    (r) => !r.subItems && r.path !== '/'
  );

  const activityRoutes =
    routes.find((r) =>
      ['Verksamhet', 'Activities'].includes(r.name)
    )?.subItems || [];

 
    const euRoutes = routes.find(
  (r) => r.path === '/eu'
);

  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">

          {/* COMPANY / CONTACT */}
          <div className="md:col-span-4 lg:col-span-2">
            <Logo />

        

            {/* CONTACT INFORMATION */}
            <div className="mt-6 space-y-4">

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    E-post
                  </p>

                  <a
                    href="mailto:info@mojligheternasplats.com"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                   info@mojligheternasplats.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Telefon
                  </p>

                  <a
                    href="tel:0761649100"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    076-164 91 00
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground shrink-0" />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Besök oss
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Oppegårdsstråket 11B
                    <br />
                    191 60 Sollentuna
                  </p>
                </div>
              </div>

            </div>

            {/* SOCIAL MEDIA */}
            <div className="mt-6 flex space-x-4">

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://www.facebook.com/mplats"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://www.instagram.com/mojligheternasplats/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>

            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="font-semibold text-foreground">
              {t('footer.explore')}
            </h3>

            <ul className="mt-4 space-y-2">
              {mainRoutes.map((route) => (
                <li key={route.name}>
                  <Link
                    href={route.path}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACTIVITIES */}
          <div>
            <h3 className="font-semibold text-foreground">
              {t('nav.activities')}
            </h3>

            <ul className="mt-4 space-y-2">
              {activityRoutes.map((route) => (
                <li key={route.name}>
                  <Link
                    href={route.path}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* EU COLLABORATIONS */}
        <div>
  <Link
    href="/eu"
    className="font-semibold text-foreground hover:text-accent transition-colors"
  >
    {t('nav.euCollaborations')}
  </Link>
</div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">

          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('common.appName')}.{' '}
            {t('footer.allRightsReserved')}.
          </p>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-accent"
            >
              {t('footer.privacyPolicy')}
            </Link>

            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-accent"
            >
              {t('footer.termsOfService')}
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}