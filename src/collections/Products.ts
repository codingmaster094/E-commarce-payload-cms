import type { CollectionConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sku', 'category', 'price', 'stock', 'availability'],
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
      label: { en: 'Product Name', de: 'Produktname' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
    },
    {
      name: 'sku',
      type: 'text',
      required: true,
      label: 'SKU',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: { en: 'Price ($)', de: 'Preis ($)' },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      label: { en: 'Compare At Price ($)', de: 'Streichpreis ($)' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: { en: 'Category', de: 'Kategorie' },
    },
    {
      name: 'collections',
      type: 'relationship',
      relationTo: 'collections',
      hasMany: true,
      label: { en: 'Collections', de: 'Kollektionen' },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: { en: 'Short Description', de: 'Kurzbeschreibung' },
    },
    {
      name: 'description',
      type: 'richText',
      label: { en: 'Full Description', de: 'Vollständige Beschreibung' },
    },
    {
      name: 'images',
      type: 'array',
      label: { en: 'Product Images', de: 'Produktbilder' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: { en: 'Main Thumbnail', de: 'Haupt-Vorschaubild' },
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
      label: { en: 'Thumbnail URL (fallback)', de: 'Vorschaubild-URL (Fallback)' },
    },
    {
      name: 'imageUrls',
      type: 'array',
      label: { en: 'Image URLs (fallback)', de: 'Bild-URLs (Fallback)' },
      fields: [{ name: 'url', type: 'text', required: true }],
    },
    {
      name: 'materials',
      type: 'array',
      label: { en: 'Materials', de: 'Materialien' },
      fields: [{ name: 'material', type: 'text', required: true }],
    },
    {
      name: 'colors',
      type: 'array',
      label: { en: 'Available Colors', de: 'Verfügbare Farben' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'hex', type: 'text', required: true },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: { en: 'Key Features', de: 'Hauptmerkmale' },
      fields: [{ name: 'feature', type: 'text', required: true }],
    },
    {
      name: 'specifications',
      type: 'array',
      label: { en: 'Specifications', de: 'Technische Daten' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'dimensions',
      type: 'group',
      label: { en: 'Dimensions', de: 'Abmessungen' },
      fields: [
        { name: 'width', type: 'text' },
        { name: 'depth', type: 'text' },
        { name: 'height', type: 'text' },
        { name: 'seatHeight', type: 'text' },
      ],
    },
    {
      name: 'weight',
      type: 'text',
      label: { en: 'Weight', de: 'Gewicht' },
    },
    {
      name: 'maxLoad',
      type: 'text',
      label: { en: 'Maximum Load', de: 'Max. Belastbarkeit' },
    },
    {
      name: 'warranty',
      type: 'text',
      defaultValue: '10 Years',
      label: { en: 'Warranty', de: 'Garantie' },
    },
    {
      name: 'stock',
      type: 'number',
      defaultValue: 50,
      label: { en: 'Stock Quantity', de: 'Lagerbestand' },
    },
    {
      name: 'availability',
      type: 'select',
      defaultValue: 'in_stock',
      options: [
        { label: 'In Stock', value: 'in_stock' },
        { label: 'Out of Stock', value: 'out_of_stock' },
        { label: 'Pre-order', value: 'pre_order' },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 4.8,
      label: { en: 'Average Rating', de: 'Bewertung' },
    },
    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 0,
      label: { en: 'Review Count', de: 'Anzahl Bewertungen' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: { en: 'Featured on Homepage', de: 'Auf Startseite hervorheben' },
    },
    {
      name: 'bestSeller',
      type: 'checkbox',
      defaultValue: false,
      label: { en: 'Best Seller', de: 'Bestseller' },
    },
    {
      name: 'newArrival',
      type: 'checkbox',
      defaultValue: false,
      label: { en: 'New Arrival', de: 'Neuheit' },
    },
  ],
}
