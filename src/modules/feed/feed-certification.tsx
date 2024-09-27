import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useAtomValue } from 'jotai'

import { userSessionAtom } from '~/atoms/session'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '~/components/tooltip'
import type { Models } from '~/models'
import { followBridge } from '~/utils/birdge'
import { cn } from '~/utils/cn'

export const FeedCertification = ({
  feed,
  owner,
  className,
}: {
  feed: Models.FeedModal
  owner?: Models.User
  className?: string
}) => {
  const me = useAtomValue(userSessionAtom)?.user
  const presentUserProfile = followBridge.profile

  if (!me) return null
  return (
    feed.ownerUserId &&
    (feed.ownerUserId === me?.id ? (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <i
            className={cn(
              'i-mingcute-certificate-line ml-1.5 shrink-0 text-accent',
              className,
            )}
          />
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent className="px-4 py-2">
            <div className="flex items-center text-base font-semibold">
              <i className="i-mingcute-certificate-line mr-2 size-4 shrink-0 text-accent" />
              Claimed Feed
            </div>
            <div>Claimed by you</div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    ) : (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <i
            className={cn(
              'i-mingcute-certificate-fill ml-1.5 shrink-0 text-amber-500',
              className,
            )}
          />
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent className="px-4 py-2">
            <div className="flex items-center text-base font-semibold">
              <i className="i-mingcute-certificate-fill mr-2 shrink-0 text-amber-500" />
              Claimed Feed
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <span>Claimed by</span>
              {feed.ownerUserId && owner ? (
                <Avatar
                  className="inline-flex aspect-square size-5 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    presentUserProfile(owner!.id, 'modal')
                  }}
                >
                  <AvatarImage src={owner.image || undefined} />
                  <AvatarFallback>{owner.name?.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ) : (
                <span>Unknown</span>
              )}
            </div>
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    ))
  )
}
