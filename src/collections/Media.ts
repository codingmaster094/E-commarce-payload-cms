import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: anyone,
    update: isAdmin,
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
    {
      name: 'usage',
      type: 'select',
      options: [
        { label: 'Product', value: 'product' },
        { label: 'Category', value: 'category' },
        { label: 'Brand', value: 'brand' },
        { label: 'Banner', value: 'banner' },
        { label: 'Blog', value: 'blog' },
        { label: 'Avatar', value: 'avatar' },
        { label: 'Icon', value: 'icon' },
        { label: 'Other', value: 'other' },
      ],
    },
  ],
  upload: true,
}
