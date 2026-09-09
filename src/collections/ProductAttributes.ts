import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'

export const ProductAttributes: CollectionConfig = {
  slug: 'product-attributes',
  labels: {
    singular: 'Product attribute',
    plural: 'Product attributes',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'type'],
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
    {
      name: 'type',
      type: 'select',
      defaultValue: 'select',
      options: [
        { label: 'Select', value: 'select' },
        { label: 'Color', value: 'color' },
        { label: 'Text', value: 'text' },
        { label: 'Number', value: 'number' },
      ],
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'hex', type: 'text' },
      ],
    },
    { name: 'filterable', type: 'checkbox', defaultValue: true },
  ],
}
