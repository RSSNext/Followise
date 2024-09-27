import type { Models } from '~/models'
import { apiClient } from '~/utils/api-client'

export const getComment = (entryId: string) => {
  return apiClient<{
    comments: Models.Comment[]
    users: Record<string, Models.User>
  }>('/comments', {
    method: 'get',
    params: {
      entry_id: entryId,
    },
  })
}

export const createComment = (entryId: string, content: string) => {
  return apiClient<Models.Comment>('/comments', {
    method: 'post',
    body: {
      entry_id: entryId,
      content,
    },
  })
}
