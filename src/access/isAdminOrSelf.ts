import type { Access } from 'payload'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user?.collection === 'users') return true
  if (user?.collection === 'customers' && user.id) {
    return { id: { equals: user.id } }
  }
  return false
}

export const isAdminOrOwnOrder: Access = ({ req: { user } }) => {
  if (user?.collection === 'users') return true
  if (user?.collection === 'customers' && user.id) {
    return { customer: { equals: user.id } }
  }
  return false
}
