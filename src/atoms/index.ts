import { atom } from 'jotai'
import type { ReactNode } from 'react'

export const portalElementsAtom = atom(
  [] as { element: ReactNode; to?: HTMLElement; id: string }[],
)
