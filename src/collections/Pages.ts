import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { SEO } from '@/app/components/SEO/config'
import { pageBlocks } from '@/blocks'
import { slugField } from '@/fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'Flexible pages built from reusable blocks, including the homepage.',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: { en: 'Title', de: 'Titel' },
    },
    slugField({ unique: true }),
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Content', de: 'Inhalt' },
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              labels: {
                singular: { en: 'Block', de: 'Block' },
                plural: { en: 'Blocks', de: 'Blöcke' },
              },
              blocks: pageBlocks,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [SEO],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}
