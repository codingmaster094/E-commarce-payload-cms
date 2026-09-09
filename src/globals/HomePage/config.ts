import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

const ctaFields = [
  { name: 'label', type: 'text' as const },
  { name: 'url', type: 'text' as const },
]

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: {
    en: 'Home page',
    de: 'Startseite',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'badge', type: 'text' },
                { name: 'heading', type: 'text' },
                { name: 'headingAccent', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'imageUrl', type: 'text' },
                { name: 'primaryCta', type: 'group', fields: ctaFields },
                { name: 'secondaryCta', type: 'group', fields: ctaFields },
                {
                  name: 'metrics',
                  type: 'array',
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Sections',
          fields: [
            {
              name: 'categoriesSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                { name: 'linkLabel', type: 'text' },
                { name: 'linkUrl', type: 'text' },
              ],
            },
            {
              name: 'productsSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                { name: 'linkLabel', type: 'text' },
                { name: 'linkUrl', type: 'text' },
              ],
            },
            {
              name: 'whyChoose',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'icon', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'ergo',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'ctaLabel', type: 'text' },
                { name: 'ctaUrl', type: 'text' },
                {
                  name: 'tabs',
                  type: 'array',
                  fields: [
                    { name: 'key', type: 'text', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea' },
                    { name: 'imageUrl', type: 'text' },
                  ],
                },
              ],
            },
            {
              name: 'collectionsSection',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
              ],
            },
            {
              name: 'testimonials',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    { name: 'quote', type: 'textarea', required: true },
                    { name: 'author', type: 'text', required: true },
                    { name: 'role', type: 'text' },
                    { name: 'rating', type: 'number', defaultValue: 5 },
                  ],
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'heading', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'primaryCta', type: 'group', fields: ctaFields },
                { name: 'secondaryCta', type: 'group', fields: ctaFields },
              ],
            },
          ],
        },
      ],
    },
  ],
}
