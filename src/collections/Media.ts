import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      label: { en: 'Alt text', de: 'Alternativtext' },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      label: { en: 'Caption', de: 'Bildunterschrift' },
    },
  ],
  upload: true,
}
