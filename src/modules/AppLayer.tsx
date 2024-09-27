import { QueryClientProvider, useQuery } from '@tanstack/react-query'
import { LazyMotion } from 'framer-motion'
import { enableMapSet } from 'immer'
import { Provider, useAtomValue, useSetAtom } from 'jotai'
import { ModalStackContainer } from 'rc-modal-sheet/m'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { getUserSession } from '~/api/session'
import { userSessionAtom } from '~/atoms/session'
import { queryClient } from '~/utils/query-client'

import { portalElementsAtom } from '../atoms'
import { jotaiStore } from '../utils/jotai'

enableMapSet()
const loadFeatures = () =>
  import('../utils/framer-lazy-feature').then((res) => res.default)
export function AppHolder() {
  const elements = useAtomValue(portalElementsAtom, { store: jotaiStore })

  return (
    <Provider store={jotaiStore}>
      <LazyMotion features={loadFeatures} strict key="framer">
        <QueryClientProvider client={queryClient}>
          <ModalStackContainer>
            <SessionProvider />
            <div>
              {elements.map(({ element, to, id }) =>
                to ? <Portal key={id} element={element} to={to} /> : element,
              )}
            </div>
          </ModalStackContainer>
        </QueryClientProvider>
      </LazyMotion>
    </Provider>
  )
}

const Portal = ({ element, to }: { element: ReactNode; to: HTMLElement }) => {
  return createPortal(element, to)
}
const SessionProvider = () => {
  const setSession = useSetAtom(userSessionAtom)
  useQuery({
    queryKey: ['session'],
    async queryFn() {
      const session = await getUserSession()

      setSession(session)
      return session
    },
  })

  return null
}
