import camelcaseKeys from 'camelcase-keys'
import { createFetch } from 'ofetch'

import { API_URL } from '~/constants/env'

export const apiClient = createFetch({
  defaults: {
    baseURL: API_URL,
    credentials: 'include',
    parseResponse(responseText) {
      return camelcaseKeys(JSON.parse(responseText), { deep: true })
    },
  },
})
