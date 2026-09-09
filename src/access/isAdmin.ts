import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => user?.collection === 'users'

export const isAdminField: FieldAccess = ({ req: { user } }) => user?.collection === 'users'
