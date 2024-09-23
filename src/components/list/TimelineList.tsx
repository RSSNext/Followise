import { clsx } from 'clsx'
import type { FC } from 'react'
import React from 'react'

export const TimelineList: FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <ul className={clsx('follow-timeline', className)}>{children}</ul>
)
