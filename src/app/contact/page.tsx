'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { sendContactClient } from '@/lib/api/contact';

export default function ContactPage() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const result = await sendContactClient({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    if (!result.success) {
      setStatus('error');
      return;
    }

    setStatus('sent');
    resetForm();

    // Reset user feedback after a delay
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div>
      <PageHeader title={t('home.cta.title')} description={t('home.cta.description')} />

      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* CONTACT FORM */}
          <div>
            <h2 className="text-3xl font-bold font-headline text-primary mb-6">
              {t('home.cta.formTitle')}
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  placeholder={t('home.cta.name')}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />

                <Input
                  type="email"
                  placeholder={t('home.cta.email')}
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  required
                />
              </div>

              <Input
                placeholder={t('home.cta.subject')}
                value={form.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                required
              />

              <Textarea
                placeholder={t('home.cta.message')}
                rows={6}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
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

          {/* CONTACT INFO */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold font-headline text-primary mb-6">
              {t('home.cta.infoTitle')}
            </h2>

            {/* EMAIL */}
            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.emailLabel')}</h3>
                <p className="text-muted-foreground">abdulkadir@mojligheternasplats.com</p>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.phoneLabel')}</h3>
                <p className="text-muted-foreground">076-164 91 00</p>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.visitLabel')}</h3>
                <p className="text-muted-foreground">Oppegårdsstråket 11B 191 60 Sollentuna</p>
              
              </div>
            </div>

            {/* INSTAGRAM */}
            <div className="flex items-start space-x-4">
              <div className="bg-accent text-accent-foreground rounded-full p-3">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{t('home.cta.instagramLabel')}</h3>
                <p className="text-muted-foreground">@mplats</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
