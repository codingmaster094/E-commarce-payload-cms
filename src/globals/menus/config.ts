import type { GlobalConfig } from 'payload'

export const menus: GlobalConfig = {
  slug: 'menus',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'menus',
      label: { en: 'Menus', de: 'Menüs' },
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'group',
          label: { en: 'Link', de: 'Link' },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: { en: 'Link Label', de: 'Link Beschriftung' },
              localized: true,
            },
            {
              name: 'url',
              type: 'text',
              label: { en: 'URL', de: 'URL' },
              localized: true,
            },
            {
              name: 'target',
              type: 'select',
              label: { en: 'Target', de: 'Ziel' },
              options: [
                {
                  label: { en: 'Same Tab', de: 'Gleiches Tab' },
                  value: '_self',
                },
                {
                  label: { en: 'New Tab', de: 'Neues Tab' },
                  value: '_blank',
                },
              ],
              defaultValue: '_self',
            },
          ],
        },
        {
          name: 'submenus',
          label: { en: 'Submenus', de: 'Untermenu' },
          type: 'array',
          fields: [
            {
              name: 'links',
              label: { en: 'Submenu Links', de: 'Untermenu Links' },
              type: 'array',
              fields: [
                {
                  name: 'link',
                  type: 'group',
                  label: { en: 'Link', de: 'Link' },
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: { en: 'Link Label', de: 'Link Beschriftung' },
                      localized: true,
                    },
                    {
                      name: 'url',
                      type: 'text',
                      label: { en: 'URL', de: 'URL' },
                      localized: true,
                    },
                    {
                      name: 'target',
                      type: 'select',
                      label: { en: 'Target', de: 'Ziel' },
                      options: [
                        {
                          label: { en: 'Same Tab', de: 'Gleiches Tab' },
                          value: '_self',
                        },
                        {
                          label: { en: 'New Tab', de: 'Neues Tab' },
                          value: '_blank',
                        },
                      ],
                      defaultValue: '_self',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
