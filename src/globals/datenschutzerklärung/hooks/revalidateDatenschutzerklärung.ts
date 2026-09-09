import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateDatenschutzerklärung: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating Datenschutzerklärung`)

    revalidateTag('global_Datenschutzerklärung')
  }

  return doc
}
