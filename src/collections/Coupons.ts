import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const Coupons: CollectionConfig = {
  slug: 'coupons',
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'type', 'value', 'status', 'expiryDate'],
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.code) data.code = String(data.code).trim().toUpperCase()
        return data
      },
    ],
  },
  fields: [
    { name: 'code', type: 'text', required: true, unique: true, index: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'percentage',
      options: [
        { label: 'Percentage', value: 'percentage' },
        { label: 'Fixed', value: 'fixed' },
      ],
    },
    { name: 'value', type: 'number', required: true },
    { name: 'minimumOrderValue', type: 'number', defaultValue: 0 },
    { name: 'maximumDiscount', type: 'number' },
    { name: 'usageLimit', type: 'number' },
    { name: 'usageCount', type: 'number', defaultValue: 0, admin: { readOnly: true } },
    { name: 'startDate', type: 'date' },
    { name: 'expiryDate', type: 'date' },
    {
      name: 'applicableProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'applicableCategories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ],
}
