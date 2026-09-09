import { getPayload } from 'payload'
import config from '@payload-config'
import { seedWebsite } from '../seed'

const payload = await getPayload({ config })
await seedWebsite(payload)
