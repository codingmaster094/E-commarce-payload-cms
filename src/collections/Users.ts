import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    cookies: {
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production' || process.env.VERCEL === '1',
    },
  },
  access: {
    admin: ({ req: { user } }) => user?.collection === 'users',
  },
  fields: [
    { name: 'name', type: 'text' },
  ],
}
