import type { Block, Field, GroupField } from 'payload'
import { blockSettings } from '@/fields/blockSettings'

export function groupToBlock(
  group: GroupField,
  options: { slug: string; labels?: Block['labels'] },
): Block {
  return {
    slug: options.slug,
    interfaceName: `${options.slug[0]?.toUpperCase()}${options.slug.slice(1)}Block`,
    labels: options.labels ?? {
      singular: group.label as string,
      plural: group.label as string,
    },
    fields: [...(group.fields as Field[]), ...blockSettings],
  }
}
