import camelcaseKeys from 'camelcase-keys'
import { $fetch } from 'ofetch'

import { API_URL } from '~/constants/env'
import type { Models } from '~/models'

export const getUserCollections = async (
  userId: string | undefined,
  handle: string | undefined,
) => {
  const api = `${API_URL}/collections/entries`

  const data = await $fetch<Models.Entry[]>(api, {
    method: 'get',
    params: {
      user_id: userId,
      handle,
    },
    // @ts-expect-error
  }).then((res) => camelcaseKeys(res, { deep: true }) as Models.Entry[])
  return data
}
