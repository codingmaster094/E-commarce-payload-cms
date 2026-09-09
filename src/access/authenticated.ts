import type { Access, FieldAccess } from 'payload'

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedField: FieldAccess = ({ req: { user } }) => Boolean(user)
