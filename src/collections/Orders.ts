import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrOwnOrder } from '@/access/isAdminOrSelf'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'customer', 'total', 'paymentStatus', 'orderStatus', 'createdAt'],
  },
  access: {
    read: isAdminOrOwnOrder,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.orderNumber) {
          data.orderNumber = `MNV-${Date.now().toString().slice(-8)}`
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'orderNumber', type: 'text', required: true, unique: true },
    { name: 'customer', type: 'relationship', relationTo: 'customers' },
    { name: 'customerEmail', type: 'email' },
    { name: 'customerName', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'productName', type: 'text', required: true },
        { name: 'productId', type: 'text', required: true },
        { name: 'sku', type: 'text' },
        { name: 'quantity', type: 'number', required: true },
        { name: 'unitPrice', type: 'number', required: true },
        { name: 'color', type: 'text' },
        { name: 'variantTitle', type: 'text' },
      ],
    },
    { name: 'subtotal', type: 'number', required: true },
    { name: 'discount', type: 'number', defaultValue: 0 },
    { name: 'couponCode', type: 'text' },
    { name: 'shipping', type: 'number', defaultValue: 0 },
    { name: 'tax', type: 'number', defaultValue: 0 },
    { name: 'total', type: 'number', required: true },
    { name: 'currency', type: 'text', defaultValue: 'USD' },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'orderStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Refunded', value: 'refunded' },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'firstName', type: 'text' },
        { name: 'lastName', type: 'text' },
        { name: 'phone', type: 'text' },
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        { name: 'sameAsShipping', type: 'checkbox', defaultValue: true },
        { name: 'firstName', type: 'text' },
        { name: 'lastName', type: 'text' },
        { name: 'street', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    { name: 'shippingMethod', type: 'text' },
    { name: 'paymentMethod', type: 'text', defaultValue: 'manual' },
    { name: 'transactionId', type: 'text' },
    { name: 'notes', type: 'textarea' },
    { name: 'trackingNumber', type: 'text' },
    { name: 'trackingUrl', type: 'text' },
  ],
}
