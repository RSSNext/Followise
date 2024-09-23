import { useQuery } from '@tanstack/react-query'
import { atom } from 'jotai'
import { Suspense } from 'react'

import { getComment } from '~/api/comment'
import type { Models } from '~/models'

import { Comments } from './Comment'
import { CommentBox } from './CommentBox'
import {
  CommentContext,
  CommentIdsContext,
  CommentMapContext,
  CommentUserMapContext,
} from './context'

export const EntryComments = ({
  feedId,
  entryId,
}: {
  feedId: string
  entryId: string
}) => {
  const { data: comments } = useQuery({
    queryFn: () => getComment(entryId),
    queryKey: ['comments', entryId],
  })
  const commentIds = useMemo(
    () =>
      atom(comments?.comments.map((c) => c.id.toString()) || ([] as string[])),
    [comments],
  )

  const commentMap = useMemo(
    () =>
      atom(
        new Map<string, Models.Comment>(
          comments?.comments.map((c) => [c.id.toString(), c]),
        ),
      ),
    [comments],
  )

  const commentUserMap = useMemo(() => comments?.users || {}, [comments?.users])

  return (
    <Suspense>
      <CommentContext.Provider
        value={useMemo(() => ({ feedId, entryId }), [feedId, entryId])}
      >
        <CommentIdsContext.Provider value={commentIds}>
          <CommentMapContext.Provider value={commentMap}>
            <CommentUserMapContext.Provider value={commentUserMap}>
              <CommentBox />
              <Comments />
            </CommentUserMapContext.Provider>
          </CommentMapContext.Provider>
        </CommentIdsContext.Provider>
      </CommentContext.Provider>
    </Suspense>
  )
}
