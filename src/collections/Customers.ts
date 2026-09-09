import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrSelf } from '@/access/isAdminOrSelf'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production' || process.env.VERCEL === '1',
    },
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'status'],
  },
  access: {
    read: isAdminOrSelf,
    create: anyone,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) return value
            const first = siblingData?.firstName || ''
            const last = siblingData?.lastName || ''
            return `${first} ${last}`.trim() || 'Customer'
          },
        ],
      },
    },
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'phone', type: 'text' },
    { name: 'avatar', type: 'upload', relationTo: 'media' },
    {
      name: 'addresses',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'firstName', type: 'text' },
        { name: 'lastName', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
        { name: 'isDefault', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'wishlist',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Disabled', value: 'disabled' },
      ],
    },
  ],
}
