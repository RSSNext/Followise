import { atom } from 'jotai'
import { $fetch } from 'ofetch'

import { followBridge } from '~/utils/birdge'

export const getUserSession = async () => {
  const apiUrl = followBridge.getApiUrl()

  const sessionUrl = `${apiUrl}/auth/session`
  const res = await $fetch(sessionUrl, {
    credentials: 'include',
  })
  return res
}
