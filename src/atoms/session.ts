import { atom } from 'jotai'
import { $fetch } from 'ofetch'

import type { Models } from '~/models'
import { followBridge } from '~/utils/birdge'

export const userSessionAtom = atom<Models.UserSession | null>(null)
