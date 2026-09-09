import type { GlobalConfig } from 'payload'
import slugify from 'slugify'
import { revalidateDatenschutzerklärung } from './hooks/revalidateDatenschutzerklärung'
import { SEO } from '@/app/components/SEO/config'
import { Content } from '@/app/components/guternburg/config'

export const Datenschutzerklärung: GlobalConfig = {
  slug: 'datenschutzerklaerung',
  label: {
    en: 'Privacy Policy',
    de: 'Datenschutzerklärung',
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
    // {
    //     name: 'author',
    //     type: 'relationship',
    //     relationTo: 'users',
    //     hasMany: false,
    //     label: { en: 'Author', de: 'Autor' },
    //     admin: { position: 'sidebar' },
    //     maxDepth: 2,
    //   },
    // {
    //   name: 'relatedPage', // Choose a descriptive name
    //   type: 'relationship',
    //   relationTo: 'pages', // This must match the slug of the collection you're linking to
    //   maxDepth: 0, // Optional: useful if you only need the ID and slug
    //   label: {
    //     en: 'Link to a Page',
    //     de: 'Mit einer Seite verknüpfen',
    //   },
    //   admin: {
    //     position: 'sidebar', // REMOVED: In v3.x, useAsTitle goes on the 'pages' collection config, not here.
    //   },
    // },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: {
        en: 'Slug',
        de: 'Kurzlink',
      },
      admin: {
        readOnly: true,
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
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Content',
            de: 'Inhalt',
          },
          fields: [Content],
        },
        {
          label: {
            en: 'SEO',
            de: 'SEO',
          },
          fields: [SEO],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: {
        en: 'Published At',
        de: 'Veröffentlicht am',
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateDatenschutzerklärung],
  },
}
