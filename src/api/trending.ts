import type { Models } from '~/models'

import { apiClient } from '../utils/api-client'

export const getTrendingList = () => {
  return apiClient<Models.TrendingList[]>('/trending-lists')
}

export const getTrendingAggregates = () => {
  return apiClient<Models.TrendingAggregates>('/trendings')
}
