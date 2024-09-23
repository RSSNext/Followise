import * as Avatar from '@radix-ui/react-avatar'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { useAtomValue, useSetAtom } from 'jotai'
import type { FC } from 'react'

import { createComment } from '~/api/comment'
import { userSessionAtom } from '~/atoms/session'
import { TextArea } from '~/components/input'
import { useUncontrolledInput } from '~/hooks/common/use-uncontrolled-input'

import {
  useCommentContext,
  useCommentIdsContext,
  useCommentMapContext,
} from './context'

export const CommentBox = () => {
  const userSession = useAtomValue(userSessionAtom)
  const commentIdsAtom = useCommentIdsContext()
  const setCommentIds = useSetAtom(commentIdsAtom)
  const commentMapAtom = useCommentMapContext()
  const setCommentMap = useSetAtom(commentMapAtom)

  const session = useAtomValue(userSessionAtom)

  const { mutateAsync: create, isPending } = useMutation({
    mutationFn: (data: { content: string; entryId: string }) =>
      createComment(data.entryId, data.content),
    onMutate({ content, entryId }) {
      const userId = session?.user.id

      const nonce = Date.now()

      if (!userId) return

      setCommentIds((prev) => [nonce.toString(), ...prev])

      setCommentMap((prev) => {
        const newMap = new Map(prev)
        newMap.set(nonce.toString(), {
          id: nonce,
          content,
          deletedAt: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId,
          isPending: true,
          entryId,
        })
        return newMap
      })

      return {
        nonce,
      }
    },
    onSuccess(data, variables, context) {
      const { nonce } = context!
      setCommentMap((prev) => {
        const newMap = new Map(prev)
        newMap.set(data.id.toString(), data)
        newMap.delete(nonce.toString())

        return newMap
      })

      setCommentIds((prev) => {
        const newIds = new Set(prev)
        newIds.delete(nonce.toString())

        return [data.id.toString(), ...Array.from(newIds)]
      })

      if (ref.current) {
        ref.current.value = ''
      }
    },
  })

  const { entryId } = useCommentContext()
  const [, getValue, ref] = useUncontrolledInput<HTMLTextAreaElement>()
  if (!userSession) return null

  return (
    <div className="mb-12">
      <div className="flex space-x-4 relative">
        <div
          className={clsx(
            'relative mb-2 shrink-0 select-none self-end rounded-full',
            'bg-zinc-200 ring-2 ring-zinc-200 dark:bg-zinc-800',
            'ml-[2px]',
          )}
        >
          <Avatar.Root>
            <Avatar.Image
              className="rounded-full object-cover"
              src={userSession.user.image}
              width={48}
              height={48}
            />
            <Avatar.Fallback className="block size-[48px] shrink-0 rounded-full" />
          </Avatar.Root>
        </div>
        <div className="relative h-[150px] w-full rounded-xl bg-gray-200/50 dark:bg-zinc-800/50">
          <TextArea
            className="pb-5 text-sm"
            placeholder="Add a comment"
            ref={ref}
          />
          <div className="absolute bottom-0 right-0 mb-2 ml-4 w-auto px-4">
            <SubmitButton
              isPending={isPending}
              onClickSend={() => {
                if (!getValue()) return
                create({
                  content: getValue()!,
                  entryId,
                })
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
const SubmitButton: FC<{
  isPending: boolean
  onClickSend: () => void
}> = ({ isPending, onClickSend }) => {
  return (
    <m.button
      className="flex appearance-none cursor-button items-center space-x-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      disabled={isPending}
      onClick={onClickSend}
    >
      <i className="size-4 text-zinc-800 dark:text-zinc-200 i-mingcute-send-plane-line" />
      <m.span className="text-xs" layout="size">
        {isPending ? 'Sending...' : 'Send'}
      </m.span>
    </m.button>
  )
}
