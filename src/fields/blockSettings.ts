import type { Field } from 'payload'

export const blockSettings: Field[] = [
  {
    name: 'settings',
    type: 'group',
    label: { en: 'Block settings', de: 'Block-Einstellungen' },
    admin: { description: 'Spacing, visibility and background for this block.' },
    fields: [
      {
        name: 'visible',
        type: 'checkbox',
        defaultValue: true,
        label: { en: 'Visible', de: 'Sichtbar' },
      },
      {
        name: 'anchor',
        type: 'text',
        label: { en: 'Anchor ID', de: 'Anker-ID' },
        admin: { description: 'Optional HTML id, e.g. kontakt' },
      },
      {
        name: 'background',
        type: 'select',
        defaultValue: 'default',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'White', value: 'white' },
          { label: 'Muted', value: 'muted' },
          { label: 'Dark', value: 'dark' },
        ],
      },
      {
        name: 'padding',
        type: 'select',
        defaultValue: 'md',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
      {
        name: 'align',
        type: 'select',
        defaultValue: 'left',
        options: [
          { label: { en: 'Left', de: 'Links' }, value: 'left' },
          { label: { en: 'Center', de: 'Zentriert' }, value: 'center' },
        ],
      },
    ],
  },
]
