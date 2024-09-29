import { atom } from 'jotai'
import { $fetch } from 'ofetch'

import { setEnvApiUrl } from '~/constants/env'
import { followBridge } from '~/utils/birdge'

export const getUserSession = async () => {
  const apiUrl = await followBridge.getApiUrl()

  setEnvApiUrl(`${apiUrl}/v1`)

  const sessionUrl = `${apiUrl}/auth/session`
  const res = await $fetch(sessionUrl, {
    credentials: 'include',
  })
  return res
}
