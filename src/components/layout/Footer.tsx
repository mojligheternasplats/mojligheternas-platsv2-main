'use client';

import Link from 'next/link';
import { navigationRoutes } from '@/lib/routes';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';



function Logo() {
  const { t } = useTranslation();
  return (
    <Link href="/" className="flex items-center space-x-2">
       <span className="h-8 w-8">
        <img src="/image/log.png" alt="Logo" className="h-full w-full" />
       </span>
      <span className="font-bold text-xl font-headline text-foreground">{t('common.appName')}</span>
    </Link>
  );
}


export function Footer() {
  const { t } = useTranslation();
  const routes = navigationRoutes(t);
  
  const mainRoutes = routes.filter(r => !r.subItems && r.path !== '/');
  const activityRoutes = routes.find(r => ['Verksamhet', 'Activities'].includes(r.name))?.subItems || [];
  const euRoutes = routes.find(r => ['EU-samarbeten', 'EU Collaborations'].includes(r.name))?.subItems || [];

  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="md:col-span-4 lg:col-span-2">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              {t('common.appDescription')}
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-accent"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-accent"><Github size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-accent"><Linkedin size={20} /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('footer.explore')}</h3>
            <ul className="mt-4 space-y-2">
              {mainRoutes.map(route => (
                <li key={route.name}><Link href={route.path} className="text-muted-foreground hover:text-accent">{route.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('nav.activities')}</h3>
            <ul className="mt-4 space-y-2">
              {activityRoutes.map(route => (
                <li key={route.name}><Link href={route.path} className="text-muted-foreground hover:text-accent">{route.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{t('nav.euCollaborations')}</h3>
            <ul className="mt-4 space-y-2">
              {euRoutes.map(route => (
                <li key={route.name}><Link href={route.path} className="text-muted-foreground hover:text-accent">{route.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('common.appName')}. {t('footer.allRightsReserved')}.
          </p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent">{t('footer.privacyPolicy')}</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent">{t('footer.termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
