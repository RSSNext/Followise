import clsx from 'clsx'
import { m } from 'framer-motion'
import { useAtomValue } from 'jotai'
import type { FC } from 'react'

import { Avatar as FollowAvatar } from '~/components/avatar'
import { RelativeTime } from '~/components/datetime'
import { softSpringPreset } from '~/constants/spring'

import styles from './comment.module.css'
import { CommentMarkdown } from './CommentMarkdown'
import {
  useCommentIdsContext,
  useCommentMapContext,
  useCommentUserMapContext,
} from './context'

export const Comments = () => {
  const commentIdsAtom = useCommentIdsContext()
  const commentIds = useAtomValue(commentIdsAtom)
  return (
    <ul className={clsx('flex flex-col gap-2 list-none')}>
      {commentIds.map((commentId) => (
        <Comment key={commentId} commentId={commentId} />
      ))}
    </ul>
  )
}

const Comment: FC<{
  commentId: string
}> = ({ commentId }) => {
  const commentMapAtom = useCommentMapContext()
  const commentMap = useAtomValue(commentMapAtom)
  const comment = commentMap.get(commentId.toString())
  const users = useCommentUserMapContext()
  if (!comment) return null
  const user = users[comment.userId]

  if (!user) return null
  return (
    <m.li
      className={clsx('relative my-2 list-none')}
      initial={{
        opacity: 0,
        scale: 0.93,
        y: 20,
      }}
      transition={softSpringPreset}
      animate={
        comment.isPending
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
    >
      <div className="group flex w-full items-stretch gap-4 relative">
        <div
          className={clsx(
            'flex shrink-0 self-end md:relative md:w-9',
            'absolute top-2',
          )}
        >
          <FollowAvatar
            shadow={false}
            imageUrl={user.image}
            alt={`${user.name}'s avatar`}
            className="size-6 select-none rounded-full bg-zinc-200 ring-2 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-800 md:size-9"
          />
        </div>

        {/* Header */}
        <div
          className={clsx('flex flex-1 flex-col', 'w-full min-w-0 items-start')}
        >
          <span
            className={clsx(
              'flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200',
              'relative w-full min-w-0 justify-center',
              'mb-2 pl-7 md:pl-0',
            )}
          >
            <span className="ml-2 flex grow gap-2 items-end">
              <span className="max-w-full shrink-0 leading-4 break-all">
                {user.name}
              </span>
              <span className="opacity-70 text-xs leading-4">
                <RelativeTime date={comment.createdAt} />
              </span>
            </span>
          </span>

          <div
            className={clsx(
              styles['comment__message'],
              'relative inline-block rounded-xl text-zinc-800 dark:text-zinc-200',
              'bg-zinc-600/5 dark:bg-zinc-500/20',
              'max-w-full',
              'rounded-tl-none',
              'ml-8 px-3 py-2 select-text text-sm',
            )}
          >
            <CommentMarkdown>{comment.content}</CommentMarkdown>
          </div>
        </div>
      </div>
    </m.li>
  )
}
