import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

import { getUserCollections } from '~/api/collections'
import { getUserProfile } from '~/api/user'
import { RelativeTime } from '~/components/datetime'
import type { Models } from '~/models'

export const SocialProfile: FC<{
  handle?: string
  id?: string
}> = ({ handle, id }) => {
  const { data: collections } = useQuery({
    queryFn: () => {
      return getUserCollections(id, handle)
    },
    queryKey: ['collections', handle || id],
  })

  if (!collections) return null
  return (
    <div>
      <section className="mb-4 flex items-center text-2xl font-bold">
        <h3>Collection Activity</h3>
      </section>

      <ul className="follow-timeline mt-4 flex flex-col pb-8 pl-2">
        {collections.map((collection) => (
          <li className="flex min-w-0 justify-between" key={collection.id}>
            <ActivityCard entry={collection} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const ActivityCard: FC<{
  entry: Models.Entry
}> = ({ entry }) => {
  return (
    <div className="pb-2 text-base">
      <div className="flex translate-y-1/4 items-center gap-2">
        <i className="i-mingcute-star-fill text-accent" />

        <div className="space-x-2">
          {/* <RelativeTime date={entry.} /> */}
          <small>starred</small>{' '}
          <a
            className="hover:!underline !decoration-accent"
            href={entry.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {entry.title}
          </a>
        </div>
      </div>
    </div>
  )
}
