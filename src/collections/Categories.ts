import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'featured'],
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: { en: 'Image URL (fallback)', de: 'Bild-URL (Fallback)' },
    },
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'categories',
      label: { en: 'Parent Category', de: 'Übergeordnete Kategorie' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
