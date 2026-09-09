import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const FaqSection: Field = {
  name: 'FaqSection',
  type: 'group',
  label: {
    en: 'Faq Section',
    de: 'FAQ-Bereich',
  },
  fields: [
    {
      name: 'enableFAQ',
      type: 'checkbox',
      label: {
        en: 'Enable FAQ Section',
        de: 'FAQ-Bereich aktivieren',
      },
      defaultValue: true,
    },
    {
      name: 'Heading',
      type: 'text',
      label: {
        en: 'Heading',
        de: 'Überschrift',
      },
    },
    {
      name: 'FaqContent',
      type: 'array',
      label: {
        en: 'Faq Content',
        de: 'FAQ-Inhalt',
      },
      minRows: 0,
      labels: {
        singular: { en: 'Faq Content', de: 'FAQ-Eintrag' },
        plural: { en: 'Faq Content', de: 'FAQ-Einträge' },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'title',
            de: 'Titel',
          },
        },
        {
          name: 'richText',
          type: 'richText',
          label: {
            en: 'Rich Text',
            de: 'Textinhalt',
          },
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              EXPERIMENTAL_TableFeature(),
            ],
          }),
        },
      ],
    },
  ],
}

export default FaqSection
