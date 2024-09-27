// profiles?handle=innei
//
// {
//   "code": 0,
//   "data": {
//       "id": "30850785944273920",
//       "name": "Innei",
//       "emailVerified": null,
//       "image": "https://avatars.githubusercontent.com/u/41265413?v=4",
//       "handle": "innei",
//       "createdAt": "2024-07-02T19:42:08.094Z"
//   }

import { $fetch } from 'ofetch'

import type { Models } from '~/models'
import { followBridge } from '~/utils/birdge'
import { isBizId } from '~/utils/utils'

// }
//

export const getUserProfile = async (handleOrId: string) => {
  const apiUrl = followBridge.getApiUrl()

  const id = isBizId(handleOrId) ? handleOrId : undefined
  const handle = isBizId(handleOrId)
    ? undefined
    : handleOrId
    ? handleOrId.startsWith('@')
      ? handleOrId.slice(1)
      : handleOrId
    : undefined

  const url = `${apiUrl}/profiles`

  const res = await $fetch<{ data: Models.User }>(url, {
    params: {
      handle,
      id,
    },
  })

  return res.data
}
