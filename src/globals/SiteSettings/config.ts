import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'
import { SEO } from '@/app/components/SEO/config'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site settings',
    de: 'Website-Einstellungen',
  },
  access: {
    read: anyone,
    update: isAdmin,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Brand', de: 'Marke' },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: { en: 'Site name', de: 'Website-Name' },
              defaultValue: 'MEANOVA CHAIRS',
            },
            {
              name: 'shortName',
              type: 'text',
              label: { en: 'Short name', de: 'Kurzname' },
            },
            {
              name: 'tagline',
              type: 'text',
              label: { en: 'Tagline', de: 'Untertitel' },
            },
            {
              name: 'brandDescription',
              type: 'textarea',
              label: { en: 'Brand description', de: 'Markenbeschreibung' },
            },
            {
              name: 'logoText',
              type: 'text',
              label: { en: 'Logo text', de: 'Logo-Text' },
            },
            {
              name: 'logoSubtext',
              type: 'text',
              label: { en: 'Logo subtext', de: 'Logo-Untertext' },
            },
            {
              name: 'currency',
              type: 'text',
              defaultValue: '$',
            },
            {
              name: 'currencyCode',
              type: 'text',
              defaultValue: 'USD',
            },
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
            { name: 'timezone', type: 'text', defaultValue: 'America/New_York' },
          ],
        },
        {
          label: { en: 'Contact', de: 'Kontakt' },
          fields: [
            { name: 'email', type: 'email', label: 'E-Mail' },
            { name: 'phone', type: 'text', label: { en: 'Phone', de: 'Telefon' } },
            { name: 'address', type: 'textarea', label: { en: 'Address', de: 'Adresse' } },
            {
              name: 'hoursWeekday',
              type: 'text',
              label: { en: 'Weekday hours', de: 'Öffnungszeiten Mo–Fr' },
            },
            {
              name: 'hoursSaturday',
              type: 'text',
              label: { en: 'Saturday hours', de: 'Öffnungszeiten Samstag' },
            },
            {
              name: 'contactIntro',
              type: 'textarea',
              label: { en: 'Contact intro', de: 'Kontakt-Einleitung' },
            },
          ],
        },
        {
          label: { en: 'Policies', de: 'Richtlinien' },
          fields: [
            {
              name: 'freeShippingThreshold',
              type: 'number',
              defaultValue: 150,
            },
            {
              name: 'warrantyYears',
              type: 'number',
              defaultValue: 10,
            },
            {
              name: 'trialDays',
              type: 'number',
              defaultValue: 30,
            },
          ],
        },
        {
          label: { en: 'Announcement', de: 'Ankündigung' },
          fields: [
            {
              name: 'announcementLeft',
              type: 'text',
            },
            {
              name: 'announcementMiddle',
              type: 'text',
            },
            {
              name: 'announcementRight',
              type: 'text',
            },
          ],
        },
        {
          label: { en: 'Social', de: 'Social' },
          fields: [
            { name: 'instagram', type: 'text' },
            { name: 'twitter', type: 'text' },
            { name: 'facebook', type: 'text' },
            { name: 'linkedin', type: 'text' },
            { name: 'youtube', type: 'text' },
          ],
        },
        {
          label: 'SEO',
          fields: [SEO],
        },
      ],
    },
  ],
}
