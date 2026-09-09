import type { Field } from 'payload'

type LinkFieldOptions = {
  name?: string
  label?: string | { en: string; de: string }
  required?: boolean
}

export const linkFields = (): Field[] => [
  {
    name: 'label',
    type: 'text',
    label: { en: 'Label', de: 'Beschriftung' },
  },
  {
    name: 'url',
    type: 'text',
    label: 'URL',
  },
  {
    name: 'target',
    type: 'select',
    label: { en: 'Target', de: 'Ziel' },
    defaultValue: '_self',
    options: [
      { label: { en: 'Same tab', de: 'Gleiches Tab' }, value: '_self' },
      { label: { en: 'New tab', de: 'Neues Tab' }, value: '_blank' },
    ],
  },
]

export const linkGroup = ({
  name = 'link',
  label = { en: 'Link', de: 'Link' },
  required = false,
}: LinkFieldOptions = {}): Field => ({
  name,
  type: 'group',
  label,
  fields: required
    ? linkFields().map((field) =>
        field.type === 'text' && (field.name === 'label' || field.name === 'url')
          ? { ...field, required: true }
          : field,
      )
    : linkFields(),
})
