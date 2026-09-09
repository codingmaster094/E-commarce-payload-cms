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
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
