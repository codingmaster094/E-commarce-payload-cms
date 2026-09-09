import { Field } from 'payload'

const cardFields: Field[] = [
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    required: false,
    label: 'Icon',
  },
  {
    name: 'heading',
    type: 'text',
    required: false,
    label: 'Titel',
  },
  {
    name: 'text',
    type: 'textarea',
    required: false,
    label: 'Beschreibung',
  },
]

const audienceTabFields: Field[] = [
  {
    name: 'tabLabel',
    type: 'text',
    required: true,
    label: 'Tab-Button',
    admin: {
      description: 'Wird als klickbarer Tab angezeigt (z. B. Unternehmen oder Kandidat:innen).',
    },
  },
  {
    name: 'topHeading',
    type: 'text',
    label: 'Obere Slider-Überschrift',
  },
  {
    name: 'topCards',
    type: 'array',
    labels: { singular: 'Karte', plural: 'Karten' },
    label: 'Obere Karten',
    fields: cardFields,
  },
  {
    type: 'collapsible',
    label: 'Mittlerer CTA',
    fields: [
      {
        name: 'ctaHeading',
        type: 'text',
        label: 'CTA-Überschrift',
      },
      {
        name: 'ctaText',
        type: 'textarea',
        label: 'CTA-Text',
      },
      {
        name: 'ctaLink',
        type: 'group',
        label: 'CTA-Button',
        fields: [
          {
            name: 'label',
            type: 'text',
            label: 'Beschriftung',
          },
          {
            name: 'url',
            type: 'text',
            label: 'URL',
            admin: { description: 'z. B. #kontakt oder /#kontakt' },
          },
          {
            name: 'target',
            type: 'select',
            label: 'Ziel',
            defaultValue: '_self',
            options: [
              { label: 'Gleiches Tab', value: '_self' },
              { label: 'Neues Tab', value: '_blank' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'bottomHeading',
    type: 'text',
    label: 'Untere Slider-Überschrift',
  },
  {
    name: 'bottomCards',
    type: 'array',
    labels: { singular: 'Karte', plural: 'Karten' },
    label: 'Untere Karten',
    fields: cardFields,
  },
]

export const Unternehmen: Field = {
  name: 'unternehmen',
  type: 'group',
  label: 'Unternehmen & Kandidat:innen',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Unternehmen',
          fields: [
            {
              name: 'unternehmenTab',
              type: 'group',
              label: false,
              fields: audienceTabFields,
            },
          ],
        },
        {
          label: 'Kandidat:innen',
          fields: [
            {
              name: 'kandidatenTab',
              type: 'group',
              label: false,
              fields: audienceTabFields,
            },
          ],
        },
      ],
    },
  ],
}

export default Unternehmen
