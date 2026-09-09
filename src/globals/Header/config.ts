import type { GlobalConfig } from 'payload'
import { revalidateHeader } from './hooks/revalidateHeader'
import slugify from 'slugify'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    de: 'Kopfzeile',
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
      name: 'Header_Logo',
      type: 'upload',
      label: {
        en: 'Logo',
        de: 'Logo',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'Mobile_Header_Logo',
      type: 'upload',
      label: {
        en: 'Mobile Logo',
        de: 'Mobiles Logo',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'link',
      type: 'group',
      label: {
        en: 'Link',
        de: 'Link',
      },
      fields: [
        {
          name: 'Kontakt_label',
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
            {
              label: {
                en: 'Same Tab',
                de: 'Gleiches Fenster',
              },
              value: '_self',
            },
            {
              label: {
                en: 'New Tab',
                de: 'Neues Fenster',
              },
              value: '_blank',
            },
          ],
          defaultValue: '_self',
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: {
        en: 'Type',
        de: 'Typ',
      },
      options: [
        {
          label: {
            en: 'None',
            de: 'Keine',
          },
          value: 'none',
        },
        {
          label: {
            en: 'High Impact',
            de: 'Hoher Einfluss',
          },
          value: 'highImpact',
        },
        {
          label: {
            en: 'Medium Impact',
            de: 'Mittlerer Einfluss',
          },
          value: 'mediumImpact',
        },
        {
          label: {
            en: 'Low Impact',
            de: 'Geringer Einfluss',
          },
          value: 'lowImpact',
        },
      ],
      required: false,
    },
    {
      name: 'media',
      type: 'upload',
      label: {
        en: 'Media',
        de: 'Medien',
      },
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'showAnnouncement',
      type: 'checkbox',
      defaultValue: true,
    },
    { name: 'searchEnabled', type: 'checkbox', defaultValue: true },
    { name: 'accountEnabled', type: 'checkbox', defaultValue: true },
    { name: 'wishlistEnabled', type: 'checkbox', defaultValue: true },
    { name: 'cartEnabled', type: 'checkbox', defaultValue: true },
    { name: 'mobileMenuEnabled', type: 'checkbox', defaultValue: true },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'navigation',
      type: 'array',
      labels: { singular: 'Nav item', plural: 'Nav items' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
        },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
        {
          name: 'children',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'link', type: 'text', required: true },
            { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
