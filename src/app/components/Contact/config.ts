import { Field } from 'payload'

export const Contact: Field = {
  name: 'kontakt',
  type: 'group',
  label: {
    en: 'Hero Section',
    de: 'Hero Bereich',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      label: {
        en: 'Heading',
        de: 'Überschrift',
      },
    },
    {
      name: 'SubHeading',
      type: 'text',
      label: {
        en: 'Sub Heading',
        de: 'Unterüberschrift',
      },
    },
    {
      name: 'FormHeading',
      type: 'text',
      label: {
        en: 'Form Heading',
        de: 'Formularüberschrift',
      },
    },
    {
      name: 'DatenschutzerklarungLink',
      type: 'group',
      label: {
        en: 'privacy-policy Link',
        de: 'Datenschutzerklärung Link',
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
    {
      name: 'sumbimtedButtonLabel',
      type: 'text',
      label: {
        en: 'Submitted Button Label',
        de: 'Abgesendete Schaltflächenbeschriftung',
      },  
    }
  ],
}
