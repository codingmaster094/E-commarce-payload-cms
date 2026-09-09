import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const OffeneStellen: Field = {
  name: 'offeneStellen',
  type: 'group',
  label: {
    en: '',
    de: '',
  },
  fields: [
    {
      name: 'offeneStellenImage',
      type: 'upload',
      label: {
        en: 'OffeneStellen Image',
        de: 'OffeneStellen Bild',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'heading',
      type: 'text',
      label: {
        en: 'Heading',
        de: 'Überschrift',
      },
    
    },
    {
      name: 'description',
      type: 'richText',
      label: {
        en: 'Description',
        de: '',
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
    {
      name: 'offeneStellen_link',
      type: 'group',
      label: {
        en: 'Hero Link',
        de: 'Held Link',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Link Label',
            de: 'Link-Beschriftung',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'URL',
            de: 'URL',
          },
        },
        {
          name: 'target',
          type: 'select',
          label: {
            en: 'Target',
            de: 'Ziel',
          },
          options: [
            { label: { en: 'Same Tab', de: 'Gleiches Tab' }, value: '_self' },
            { label: { en: 'New Tab', de: 'Neues Tab' }, value: '_blank' },
          ],
          defaultValue: '_self',
        },
      ],
    },
  ],
}

export default OffeneStellen
