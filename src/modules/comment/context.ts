import type { PrimitiveAtom } from 'jotai'
import { atom } from 'jotai'
import { createContext, useContext } from 'react'

import type { Models } from '~/models'

export const CommentContext = createContext<{
  feedId: string
  entryId: string
}>({
  feedId: '',
  entryId: '',
})
export const useCommentContext = () => useContext(CommentContext)

export const CommentIdsContext = createContext<PrimitiveAtom<string[]>>(
  atom([] as string[]),
)
export const useCommentIdsContext = () => useContext(CommentIdsContext)

export const CommentMapContext = createContext<
  PrimitiveAtom<
    Map<
      string,
      Models.Comment & {
        isPending?: boolean
      }
    >
  >
>(atom(new Map()))
export const useCommentMapContext = () => useContext(CommentMapContext)

export const CommentUserMapContext = createContext<Record<string, Models.User>>(
  {},
)
export const useCommentUserMapContext = () => useContext(CommentUserMapContext)
