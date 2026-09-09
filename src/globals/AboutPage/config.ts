import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: {
    en: 'About page',
    de: 'Über uns',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'heroEyebrow',
      type: 'text',
    },
    {
      name: 'heroHeading',
      type: 'text',
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'storyEyebrow',
      type: 'text',
    },
    {
      name: 'storyHeading',
      type: 'text',
    },
    {
      name: 'storyParagraphs',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'storyImageUrl',
      type: 'text',
    },
    {
      name: 'pillarsHeading',
      type: 'text',
    },
    {
      name: 'pillars',
      type: 'array',
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'ctaHeading',
      type: 'text',
    },
    {
      name: 'ctaLabel',
      type: 'text',
    },
    {
      name: 'ctaUrl',
      type: 'text',
    },
  ],
}
