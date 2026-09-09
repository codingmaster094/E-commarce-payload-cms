import type { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const SEO: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    {
      name: 'meta',
      label: {
        en: 'SEO',
        de: 'SEO',
      },
      type: 'group',
      fields: [
        MetaTitleField({ hasGenerateFn: true }),
        MetaDescriptionField({ hasGenerateFn: true }),
        MetaImageField({ relationTo: 'media' }),
        {
          name: 'schemaMarkup',
          label: 'Schema Markup (JSON-LD)',
          type: 'code',
          admin: {
            language: 'json',
            description: 'Enter your JSON-LD schema markup here. This is typically used for rich snippets.',
          },
        },
        {
          name: 'indexing',
          type: 'radio',
          label: 'Indexing',
          options: [
            {
              label: 'Index',
              value: 'index',
            },
            {
              label: 'No Index',
              value: 'noindex',
            },
          ],
          defaultValue: 'index',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'following',
          type: 'radio',
          label: 'Link Following',
          options: [
            {
              label: 'Follow',
              value: 'follow',
            },
            {
              label: 'No Follow',
              value: 'nofollow',
            },
          ],
          defaultValue: 'follow',
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'canonicalUrl',
          label: 'Canonical URL',
          type: 'text',
          hooks: {
            beforeChange: [async ({ value }) => value || process.env.NEXT_PUBLIC_SERVER_URL || process.env.BASE_DOAMAIN],
          },
        },
        PreviewField({ hasGenerateFn: true }),
        OverviewField({
          titlePath: 'meta.title',
          descriptionPath: 'meta.description',
          imagePath: 'meta.image',
        }),
      ],
    },
  ],
}