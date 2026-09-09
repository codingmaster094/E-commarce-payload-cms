import type { Block } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export const ProductGridBlock: Block = {
  slug: 'productGrid',
  interfaceName: 'ProductGridBlock',
  labels: { singular: 'Product grid', plural: 'Product grids' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'eyebrow', type: 'text' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured', value: 'featured' },
        { label: 'Best sellers', value: 'bestSeller' },
        { label: 'New arrivals', value: 'newArrival' },
        { label: 'Selected products', value: 'selected' },
      ],
    },
    { name: 'products', type: 'relationship', relationTo: 'products', hasMany: true },
    { name: 'limit', type: 'number', defaultValue: 8 },
    ...blockSettings,
  ],
}

export const ProductCarouselBlock: Block = {
  slug: 'productCarousel',
  interfaceName: 'ProductCarouselBlock',
  labels: { singular: 'Product carousel', plural: 'Product carousels' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured', value: 'featured' },
        { label: 'Best sellers', value: 'bestSeller' },
        { label: 'New arrivals', value: 'newArrival' },
      ],
    },
    ...blockSettings,
  ],
}

export const CategoryGridBlock: Block = {
  slug: 'categoryGrid',
  interfaceName: 'CategoryGridBlock',
  labels: { singular: 'Category grid', plural: 'Category grids' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'eyebrow', type: 'text' },
    { name: 'featuredOnly', type: 'checkbox', defaultValue: true },
    ...blockSettings,
  ],
}

export const BrandGridBlock: Block = {
  slug: 'brandGrid',
  interfaceName: 'BrandGridBlock',
  labels: { singular: 'Brand grid', plural: 'Brand grids' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'brands', type: 'relationship', relationTo: 'brands', hasMany: true },
    ...blockSettings,
  ],
}

export const PromoBannerBlock: Block = {
  slug: 'promoBanner',
  interfaceName: 'PromoBannerBlock',
  labels: { singular: 'Promo banner', plural: 'Promo banners' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true },
    { name: 'text', type: 'textarea' },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaUrl', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    ...blockSettings,
  ],
}

export const NewsletterBlock: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  labels: { singular: 'Newsletter', plural: 'Newsletters' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'text', type: 'textarea' },
    ...blockSettings,
  ],
}

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: { singular: 'Features', plural: 'Features' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    ...blockSettings,
  ],
}

export const TestimonialsCmsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsCmsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'rating', type: 'number', min: 1, max: 5 },
      ],
    },
    ...blockSettings,
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    ...blockSettings,
  ],
}

export const VideoBlock: Block = {
  slug: 'video',
  interfaceName: 'VideoBlock',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'url', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    ...blockSettings,
  ],
}

export const LogoCloudBlock: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: { singular: 'Logo cloud', plural: 'Logo clouds' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'logos',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text' },
      ],
    },
    ...blockSettings,
  ],
}

export const ColumnsBlock: Block = {
  slug: 'columns',
  interfaceName: 'ColumnsBlock',
  labels: { singular: 'Columns', plural: 'Columns' },
  fields: [
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'text', type: 'textarea' },
      ],
    },
    ...blockSettings,
  ],
}

export const ecommerceBlocks: Block[] = [
  ProductGridBlock,
  ProductCarouselBlock,
  CategoryGridBlock,
  BrandGridBlock,
  PromoBannerBlock,
  NewsletterBlock,
  FeaturesBlock,
  TestimonialsCmsBlock,
  GalleryBlock,
  VideoBlock,
  LogoCloudBlock,
  ColumnsBlock,
]
