import type { NavItem } from '@/lib/definitions';
import type { TFunction } from 'i18next';

export const navigationRoutes = (t: TFunction): NavItem[] => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.about'), path: '/about' },

  {
    name: t('nav.activities'),
    path: '#',
    subItems: [
      { name: t('nav.leadership'), path: '/activities/ledarskapsutbildning' },
      { name: t('nav.dreamAcademy'), path: '/activities/dreamacademy' },
      { name: t('nav.summerCamp'), path: '/activities/summercamp' },
      { name: t('nav.autumnCamp'), path: '/activities/hostcamp' },
      { name: t('nav.eveningOpen'), path: '/activities/kvallsoppet' },
    ],
  },

  // EU SECTION — top-level only (dynamic future dropdown possible)
  { name: t('nav.euCollaborations'), path: '/eu' },

  // LOCAL PROJECTS
  { name: t('nav.localProjects'), path: '/projects/local' },

  // STANDARD PAGES
  { name: t('nav.news'), path: '/news' },
  { name: t('nav.events'), path: '/events' },
  { name: t('nav.projects'), path: '/projects' },
  { name: t('nav.partners'), path: '/partners' },
  { name: t('nav.media'), path: '/media' },
  { name: t('nav.contact'), path: '/contact' },
  { name: t('nav.engage'), path: '/engage' },
];
