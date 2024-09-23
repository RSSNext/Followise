import { useQuery } from '@tanstack/react-query'
import { m } from 'framer-motion'
import { useModalStack } from 'rc-modal-sheet'
import type { FC } from 'react'

import { getTrendingAggregates } from '~/api/trending'
import { Avatar as FAvatar } from '~/components/avatar'
import { Button } from '~/components/button'
import { FeedIcon } from '~/components/feed/FeedIcon'
import { PhUsersBold } from '~/components/icons/users'
import { LoadingCircle } from '~/components/loading'
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/tooltip'
import { followBridge } from '~/utils/birdge'

import { IconoirBrightCrown } from '../components/icons/crown'
import { DrawerModalLayout } from '../components/modal/layouts/drawer'
import type { Models } from '../models'
import { cn } from '../utils/cn'

export const Trend = () => {
  const { present } = useModalStack()
  return (
    <Tooltip>
      <TooltipContent>Trending</TooltipContent>
      <TooltipTrigger asChild>
        <m.button
          type="button"
          onClick={() => {
            present({
              title: 'test',
              content: TrendContent,
              CustomModalComponent: DrawerModalLayout,
            })
          }}
          className={cn(
            'p-1 size-6 flex items-center justify-center rounded-full box-content text-accent',
            'hover:shadow-none duration-200',
            'cursor-pointer',
            'absolute bottom-0 right-2',
          )}
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          whileTap={{
            scale: 0.92,
          }}
        >
          <i className="i-mingcute-trending-up-line" />
        </m.button>
      </TooltipTrigger>
    </Tooltip>
  )
}
const TrendContent = () => {
  const { data } = useQuery({
    queryKey: ['trending'],
    queryFn: async () => {
      const data = await getTrendingAggregates()
      return data
    },
  })

  if (!data)
    return (
      <div className="absolute inset-0 center">
        <LoadingCircle size="large" />
      </div>
    )
  return (
    <div className="flex grow flex-col gap-4 size-full">
      <div className="flex justify-center items-center text-2xl gap-2 w-full">
        <i className="i-mingcute-trending-up-line text-3xl"></i>
        <span className="font-bold">Trending</span>
      </div>
      <div className="flex flex-col grow h-0 overflow-auto w-[calc(100%+8px)] pr-2 pb-4">
        <TrendingUsers data={data.trendingUsers} />
        <TrendingLists data={data.trendingLists} />
        <TrendingFeeds data={data.trendingFeeds} />

        <TrendingEntries data={data.trendingEntries} />
      </div>
    </div>
  )
}
const TrendingLists: FC<{
  data: Models.TrendingList[]
}> = ({ data }) => {
  return (
    <section className="w-full text-left mt-8">
      <h2 className="text-xl font-bold my-2">Trending Lists</h2>

      <ul className="mt-4 flex flex-col gap-3 pb-4">
        {data.map((item) => (
          <li key={item.id} className="pl-2">
            <button
              type="button"
              className={cn(
                'flex min-w-0 items-center w-full cursor-pointer',
                'hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md duration-200',
              )}
              onClick={() => {
                followBridge.follow(item.id, { isList: true })
              }}
            >
              <FeedIcon
                name={item.title}
                fallback
                src={item.image}
                size={40}
                className="rounded-xl"
              />
              <div className={cn('flex flex-col w-full ml-1 text-left')}>
                <div className="flex items-end gap-2">
                  <div className={cn('truncate text-base font-medium')}>
                    {item.title}
                  </div>

                  <UserCount count={item.subscriberCount} />
                </div>
                <div className={cn('text-sm -mt-1')}>{item.description}</div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

const UserCount = ({ count }: { count: number }) => {
  return (
    <span className="text-xs items-center flex text-gray-500 gap-0.5 -translate-y-0.5">
      <PhUsersBold className="size-3" />
      {count}
    </span>
  )
}

interface TopUserAvatarProps {
  user: User
  position: string
}

const TopUserAvatar: React.FC<TopUserAvatarProps> = ({ user, position }) => (
  <div className={`absolute ${position} flex flex-col w-[50px]`}>
    <FAvatar
      imageUrl={user.image}
      text={user.name}
      randomColor
      size={50}
      radius="full"
      shadow
    />
    <span className="text-sm mt-1 font-medium truncate text-center">
      {user.name}
    </span>
  </div>
)

const TrendingUsers: FC<{ data: Models.User[] }> = ({ data }) => {
  return (
    <section className="w-full text-left">
      <h2 className="text-xl font-bold my-2">Trending Users</h2>
      <div className="h-[100px] relative">
        <div className="absolute top-[8px] rotate-[40deg] text-[20px] text-accent left-[calc(50%+15px)]">
          <IconoirBrightCrown />
        </div>
        {/* Top 3 users */}
        {data.slice(0, 3).map((user, index: number) => (
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => {
              followBridge.profile(user.id, 'drawer')
            }}
            key={user.id}
          >
            <TopUserAvatar
              user={user}
              position={
                index === 0
                  ? 'left-1/2 -translate-x-1/2'
                  : index === 1
                  ? 'left-1/3 top-6 -translate-x-1/2'
                  : 'left-2/3 top-6 -translate-x-1/2'
              }
            />
          </button>
        ))}
      </div>

      {data.length > 3 && (
        <ul className="mt-8 flex flex-col gap-4 pl-2">
          {data.slice(3).map((user) => (
            <li key={user.id} className="flex items-center gap-3">
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => {
                  followBridge.profile(user.id, 'modal')
                }}
              >
                <FAvatar
                  imageUrl={user.image}
                  text={user.name}
                  size={40}
                  radius={'full'}
                />
              </button>

              <span className="font-medium">{user.name}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

const TrendingFeeds = ({ data }: { data: Models.TrendingFeed[] }) => {
  return (
    <section className="w-full text-left mt-8">
      <h2 className="text-xl font-bold my-2">Trending Feeds</h2>

      <ul className="mt-4 flex flex-col">
        {data.map((feed) => {
          return (
            <li
              className={cn(
                'flex items-center gap-1 pl-2 group w-full hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md duration-200',
                'relative',
              )}
              key={feed.id}
            >
              <a
                target="_blank"
                href={`/feed/${feed.id}`}
                className="grow flex items-center gap-2 py-1"
              >
                <div className="size-4">
                  <FeedIcon
                    className="flex center"
                    fallback
                    size={16}
                    src={feed.image}
                    name={feed.title}
                    siteUrl={feed.siteUrl}
                  />
                </div>
                <div className="flex items-center min-w-0 grow w-full">
                  <div className={cn('truncate')}>{feed.title}</div>
                  {/* <FeedCertification
                  feed={feed}
                  owner={{
                    id: '1',
                    handle: 'innei',
                    name: 'Innei',
                    image:
                      'https://avatars.githubusercontent.com/u/41265413?v=4',
                  }}
                  className="text-[15px]"
                /> */}
                </div>
              </a>

              <div className="pr-2">
                <UserCount count={feed.subscriberCount} />
                {/*  Follow action */}

                <Button
                  type="button"
                  className={cn(
                    'absolute right-2 inset-y-0 duration-200 group-hover:opacity-100 opacity-0',
                  )}
                  onClick={() => {
                    followBridge.follow(feed.id, { isList: false })
                  }}
                >
                  Follow
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const TrendingEntries = ({ data }: { data: Models.TrendingEntry[] }) => {
  const filteredData = data.filter(
    (entry) => !entry.url.startsWith('https://x.com'),
  )
  return (
    <section className="w-full text-left mt-8">
      <h2 className="text-xl font-bold my-2">Trending Entries</h2>

      <ul className="list-inside list-disc space-y-1">
        {filteredData.map((entry) => {
          return (
            <li key={entry.id} className="marker:text-accent relative pr-10">
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="follow-link--underline text-sm"
              >
                {entry.title}
              </a>
              <span className="absolute right-0 top-0 text-xs flex gap-0.5 items-center opacity-60">
                <i className="i-mingcute-book-2-line" />
                <span>{entry.readCount}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
