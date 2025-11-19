'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin , Instagram } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (res.ok) {
        setStatus('sent');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      <PageHeader title={t('home.cta.title')} description={t('home.cta.description')} />
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold font-headline text-primary mb-6">
              {t('home.cta.formTitle')}
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  placeholder={t('home.cta.name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="email"
                  placeholder={t('home.cta.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Input
                placeholder={t('home.cta.subject')}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <Textarea
                placeholder={t('home.cta.message')}
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button type="submit" size="lg" disabled={status === 'sending'}>
                {status === 'sending' ? t('home.cta.sending') : t('home.cta.send')}
              </Button>
              {status === 'sent' && (
                <p className="text-green-600 mt-2">{t('home.cta.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 mt-2">{t('home.cta.error')}</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-primary mb-6">
              {t('home.cta.infoTitle')}
            </h2>

            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.emailLabel')}</h3>
                <p className="text-muted-foreground">hallo@mplats.se</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.phoneLabel')}</h3>
                <p className="text-muted-foreground">076-164 91 00</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.visitLabel')}</h3>
                <p className="text-muted-foreground">Malmvägen 32, Sollentuna</p>
              </div>
            </div>

             <div className="flex items-start space-x-4">
                 <div className="bg-accent text-accent-foreground rounded-full p-3">
               <Instagram className="h-6 w-6" />
             
              </div>
            
              <div>
                
                <h3 className="text-xl font-semibold">{t('home.cta.instagramLabel')}</h3>
                <p className="text-muted-foreground">@mplats</p>
              </div>
            </div>

            {/* <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">{t('home.cta.copyright')}</p>
              <div className="flex gap-4 mt-2 text-sm text-accent">
                <Link href="/about">{t('home.cta.about')}</Link>
                <Link href="/news">{t('home.cta.news')}</Link>
                <Link href="/">{t('home.cta.join')}</Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
