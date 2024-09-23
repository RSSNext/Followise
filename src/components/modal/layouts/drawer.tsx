import { m, useAnimationControls } from 'framer-motion'
import { useCurrentModal } from 'rc-modal-sheet'
import type { FC, PropsWithChildren } from 'react'

import { cn } from '~/utils/cn'
import { nextFrame, stopPropagation } from '~/utils/dom'

const modalVariant = {
  enter: {
    x: 0,
    opacity: 1,
  },
  initial: {
    x: 700,
    opacity: 0.9,
  },
  exit: {
    x: 750,
    opacity: 0,
  },
}
export const DrawerModalLayout: FC<PropsWithChildren> = ({ children }) => {
  const { dismiss } = useCurrentModal()
  const controller = useAnimationControls()
  useEffect(() => {
    nextFrame(() => controller.start('enter'))
  }, [controller])

  return (
    <div className={'h-full'} onPointerDown={dismiss} onClick={stopPropagation}>
      <m.div
        onPointerDown={stopPropagation}
        tabIndex={-1}
        initial="initial"
        animate={controller}
        variants={modalVariant}
        transition={{
          type: 'spring',
          mass: 0.4,
          tension: 100,
          friction: 1,
        }}
        exit="exit"
        layout="size"
        className={cn(
          'flex flex-col items-center overflow-hidden rounded-xl border bg-theme-background p-8 pb-0',
          'shadow-drawer-left w-[60ch] max-w-full',
          'fixed right-2 inset-y-2',
        )}
      >
        {children}
      </m.div>
    </div>
  )
}
