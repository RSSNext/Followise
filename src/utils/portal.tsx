import type { ReactNode } from 'react'
import type React from 'react'
import { cloneElement, createElement } from 'react'
import { createRoot } from 'react-dom/client'

import { portalElementsAtom } from '../atoms'
import { AppHolder } from '../modules/AppLayer'
import { jotaiStore } from './jotai'

export const initRenderContainer = () => {
  const $container = document.createElement('div')
  document.body.append($container)
  const root = createRoot($container)
  root.render(createElement(AppHolder))
}

export const mountReactElement = (
  element: React.JSX.Element,
  to?: HTMLElement,
) => {
  const id = Math.random().toString(36).slice(2, 15)
  const options = {
    element,
    to,
    id,
  }
  jotaiStore.set(portalElementsAtom, (prev) => [...prev, options])

  return () => {
    jotaiStore.set(portalElementsAtom, (prev) =>
      prev.filter((e) => e !== options),
    )
  }
}
