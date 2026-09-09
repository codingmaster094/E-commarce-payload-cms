import type { Block } from 'payload'
import { Hero } from '@/app/components/Hero/config'
import Personalvermittlung from '@/app/components/Personalvermittlung/config'
import OffeneStellen from '@/app/components/offeneStellen/config'
import FaqSection from '@/app/components/FaqSection/config'
import Unternehmen from '@/app/components/Unternehmen/config'
import { Contact } from '@/app/components/Contact/config'
import { Content } from '@/app/components/guternburg/config'
import { linkGroup } from '@/fields/link'
import { blockSettings } from '@/fields/blockSettings'
import { defaultLexical } from '@/fields/defaultLexical'
import { groupToBlock } from '@/blocks/groupToBlock'
import type { GroupField } from 'payload'

export const HeroBlock = groupToBlock(Hero as GroupField, {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Hero' },
})

export const PersonalvermittlungBlock = groupToBlock(Personalvermittlung as GroupField, {
  slug: 'personalvermittlung',
  labels: { singular: 'Personalvermittlung', plural: 'Personalvermittlung' },
})

export const OffeneStellenBlock = groupToBlock(OffeneStellen as GroupField, {
  slug: 'offeneStellen',
  labels: { singular: 'Jobs', plural: 'Jobs' },
})

export const FaqBlock = groupToBlock(FaqSection as GroupField, {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQ' },
})

export const UnternehmenBlock = groupToBlock(Unternehmen as GroupField, {
  slug: 'unternehmen',
  labels: { singular: 'Tabs / Cards', plural: 'Tabs / Cards' },
})

export const ContactBlock = groupToBlock(Contact as GroupField, {
  slug: 'contact',
  labels: { singular: 'Contact form', plural: 'Contact forms' },
})

export const RichContentBlock = groupToBlock(Content as GroupField, {
  slug: 'richContent',
  labels: { singular: 'Rich content', plural: 'Rich content' },
})

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'CTA', plural: 'CTAs' },
  fields: [
    { name: 'heading', type: 'text', label: { en: 'Heading', de: 'Überschrift' } },
    { name: 'text', type: 'textarea', label: { en: 'Text', de: 'Text' } },
    linkGroup({ name: 'button', label: { en: 'Button', de: 'Button' } }),
    ...blockSettings,
  ],
}

export const ImageBlock: Block = {
  slug: 'image',
  interfaceName: 'ImageBlock',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Image', de: 'Bild' },
    },
    { name: 'caption', type: 'text', label: { en: 'Caption', de: 'Bildunterschrift' } },
    ...blockSettings,
  ],
}

export const SpacerBlock: Block = {
  slug: 'spacer',
  interfaceName: 'SpacerBlock',
  labels: { singular: 'Spacer', plural: 'Spacers' },
  fields: [
    {
      name: 'size',
      type: 'select',
      defaultValue: 'md',
      options: [
        { label: 'S', value: 'sm' },
        { label: 'M', value: 'md' },
        { label: 'L', value: 'lg' },
      ],
    },
    ...blockSettings,
  ],
}

export const HtmlBlock: Block = {
  slug: 'html',
  interfaceName: 'HtmlBlock',
  labels: { singular: 'Custom HTML', plural: 'Custom HTML' },
  fields: [
    {
      name: 'html',
      type: 'code',
      admin: { language: 'html' },
      label: 'HTML',
    },
    ...blockSettings,
  ],
}

export const BannerBlock: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  labels: { singular: 'Banner', plural: 'Banners' },
  fields: [
    { name: 'text', type: 'text', required: true },
    linkGroup({ name: 'link' }),
    ...blockSettings,
  ],
}

export const AccordionBlock: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  labels: { singular: 'Accordion', plural: 'Accordions' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'richText', editor: defaultLexical },
      ],
    },
    ...blockSettings,
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  PersonalvermittlungBlock,
  UnternehmenBlock,
  OffeneStellenBlock,
  FaqBlock,
  ContactBlock,
  RichContentBlock,
  CtaBlock,
  ImageBlock,
  BannerBlock,
  AccordionBlock,
  SpacerBlock,
  HtmlBlock,
]
