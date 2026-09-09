import type { Field } from 'payload'
import slugify from 'slugify'

export const slugField = ({ unique = false }: { unique?: boolean } = {}): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique,
  label: { en: 'Slug', de: 'Kurzlink' },
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (typeof value === 'string' && value.trim()) {
          return slugify(value, { lower: true, strict: true })
        }
        const title = data?.title
        if (typeof title === 'string' && title.trim()) {
          return slugify(title, { lower: true, strict: true })
        }
        return value
      },
    ],
  },
})
