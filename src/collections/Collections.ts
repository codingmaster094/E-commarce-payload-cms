import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'

export const ProductCollections: CollectionConfig = {
  slug: 'collections',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'featured'],
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageUrl', type: 'text', label: { en: 'Image URL (fallback)', de: 'Bild-URL (Fallback)' } },
    { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: true },
  ],
}
