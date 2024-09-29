import '../css/tw.css'

import { createElement } from 'react'

import { DOM_MAP } from '~/constants/dom'
import { EntryComments } from '~/modules/comment/EntryComments'
import { EntryColumnExtra } from '~/modules/entry'
import { SocialProfile } from '~/modules/SocialProfile'
import { Trend } from '~/modules/Trend'
import { waitForReady } from '~/utils/dom'
import { initRenderContainer, mountReactElement } from '~/utils/portal'
import { isBizId } from '~/utils/utils'

const getCurrentPath = () => {
  const isHashRoute = window.location.hash.startsWith('#/')
  if (isHashRoute) {
    return window.location.hash.slice(1)
  }

  return window.location.pathname
}
let globalCurrentPath = ''
function main() {
  initRenderContainer()

  let cachedDisposer: (() => any) | undefined
  const originalPushState = history.pushState
  history.pushState = function (...args) {
    const path = args[2]

    cachedDisposer?.()

    cachedDisposer = handleHistoryChange(path as string)
    return originalPushState.apply(history, args)
  }

  window.addEventListener('popstate', () => {
    const currentPath = getCurrentPath()
    cachedDisposer = handleHistoryChange(currentPath)
  })

  const currentPath = getCurrentPath()

  cachedDisposer = handleHistoryChange(currentPath)

  function handleHistoryChange(path: string) {
    globalCurrentPath = path

    console.info('Route change', path)
    switch (true) {
      case path === '/discover': {
        return waitForReady(injectDiscover)
      }
      case path.startsWith('/feeds'): {
        // /feeds/51109945767644160/60941346687490048?view=0
        const match = path.match(/\/feeds\/(.*?)\/(\d+)/)
        const feedIdOrOther = match?.[1]
        const entryId = match?.[2]

        if (!feedIdOrOther) return

        return waitForReady(() => {
          const disposers = [] as any[]

          if (entryId) {
            disposers.push(injectEntryContent(feedIdOrOther, entryId))
          }

          disposers.push(injectFeedColumns())

          return () => disposers.map((e) => e())
        })
      }
      case path.startsWith('/profile/'): {
        const userIdOrHandle = path.match(/\/profile\/(.*)/)?.[1]
        if (!userIdOrHandle) return
        const id = isBizId(userIdOrHandle) ? userIdOrHandle : undefined
        const handle = !id
          ? userIdOrHandle.startsWith('@')
            ? userIdOrHandle.slice(1)
            : userIdOrHandle
          : undefined

        return waitForReady(() => {
          return injectProfile(id, handle)
        })
      }
    }
  }
}
export default defineContentScript({
  matches: ['*://*.follow.is/*'],
  world: 'MAIN',
  main() {
    main()
  },
})

function injectDiscover() {
  const selector = DOM_MAP.DISCOVER_TRENDING_INJECT_DOM
  const element = document.querySelector(selector) as HTMLElement
  if (!element) return
  element.style.position = 'relative'

  return mountReactElement(createElement(Trend), element)
}
function injectEntryContent(feedId: string, entryId: string) {
  const $article = document.querySelector(DOM_MAP.ENTRY_CONTENT)
  if (!$article) return

  return mountReactElement(
    createElement(EntryComments, { feedId, entryId }),
    $article as HTMLElement,
  )
}
function injectFeedColumns() {
  const $feedColumn = document.querySelector(DOM_MAP.ENTRY_COLUMN)
  if (!$feedColumn) return

  return mountReactElement(
    createElement(EntryColumnExtra, {
      portalElement: $feedColumn as HTMLElement,
    }),
    $feedColumn as HTMLElement,
  )
}

function injectProfile(id?: string, handle?: string) {
  let dispose = () => {}
  waitingForPageReady(
    () => {
      const $profileSubContainer = document.querySelector(
        DOM_MAP.PROFILE_SECTION,
      )
      const $container = document.createElement('div')
      $profileSubContainer?.prepend($container)

      dispose = mountReactElement(
        createElement(SocialProfile, { id, handle }),
        $container,
      )
    },
    DOM_MAP.PROFILE_SECTION,
    (path) => path.startsWith('/profile/'),
  )

  return () => dispose()
}

const waitingForPageReady = (
  fn: (dom: HTMLElement) => any,
  selector: string,
  canDo: (path: string) => boolean,
) => {
  const $element = document.querySelector(selector)
  // console.log($element)
  if (!$element) {
    return setTimeout(() => {
      if (canDo(globalCurrentPath)) {
        waitingForPageReady(fn, selector, canDo)
      }
    }, 100)
  }
  return fn($element as HTMLElement)
}
