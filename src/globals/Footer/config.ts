import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'
import slugify from 'slugify'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    de: 'Fußzeile',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
      label: {
        en: 'Title',
        de: 'Titel',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
      label: {
        en: 'Slug',
        de: 'Kurzlink',
      },
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            if (siblingData?.title) {
              return slugify(siblingData.title, { lower: true })
            }
            return value
          },
        ],
      },
    },
    {
      name: 'footerlogo',
      type: 'upload',
      label: {
        en: 'Footer Logo',
        de: 'Fußzeilen-Logo',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: {
        en: 'Footer Description',
        de: 'Footer Beschreibung',
      },
    },
    {
      name: 'social',
      label: {
        en: 'Social',
        de: 'Sozial',
      },
      type: 'array',
      labels: {
        singular: { en: 'Social Link', de: 'Sozialer Link' },
        plural: { en: 'Social Links', de: 'Soziale Links' },
      },
      fields: [
        {
          name: 'social_icon',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Social Icon',
            de: 'Sozial Icon',
          },
          required: true,
        },
        {
          name: 'social_url',
          type: 'text',
          label: {
            en: 'Social URL',
            de: 'Sozial URL',
          },
          required: true,
        },
      ],
    },
    {
      name: 'kontakt',
      label: {
        en: 'Contact',
        de: 'Kontakt',
      },
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: {
            en: 'Phone Number',
            de: 'Telefonnummer',
          },
        },
        {
          name: 'phone_urls',
          type: 'text',
          label: {
            en: 'Phone URL',
            de: 'Telefon URL',
          },
        },
        {
          name: 'email',
          type: 'text',
          label: {
            en: 'Email',
            de: 'E-Mail',
          },
        },
        {
          name: 'email_url',
          type: 'text',
          label: {
            en: 'Email URL',
            de: 'E-Mail URL',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: {
            en: 'Address',
            de: 'Adresse',
          },
        },
        {
          name: 'address_url',
          type: 'text',
          label: {
            en: 'Address URL',
            de: 'Adresse URL',
          },
        },
      ],
    },
    {
          name: 'sprechzeiten',
          label: {
            en: 'Opening Hours',
            de: 'Sprechzeiten',
          },
          type: 'array',
          fields: [
            {
              name: 'day',
              type: 'text',
              label: {
                en: 'Day',
                de: 'Tag',
              },
            },
            {
              name: 'time',
              type: 'text',
              label: {
                en: 'Time',
                de: 'Uhrzeit',
              },
            },
          ],
        },
    {
      name: 'navigation',
      label: {
        en: 'Navigation',
        de: 'Navigation',
      },
      type: 'array',
      labels: {
        singular: { en: 'Navigation Group', de: 'Navigationsgruppe' },
        plural: { en: 'Navigation Groups', de: 'Navigationsgruppen' },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: {
            en: 'Heading',
            de: 'Überschrift',
          },
          required: true,
        },
        {
          name: 'menus',
          type: 'array',
          labels: {
            singular: { en: 'Menu Item', de: 'Menüpunkt' },
            plural: { en: 'Menu Items', de: 'Menüpunkte' },
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: {
                en: 'Link Label',
                de: 'Linktext',
              },
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: {
                en: 'URL',
                de: 'URL',
              },
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'legalLinks',
      label: {
        en: 'Legal',
        de: 'Rechtliches',
      },
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: {
            en: 'Link Label',
            de: 'Linktext',
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
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: {
        en: 'Copyright Text',
        de: 'Copyright Text',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
