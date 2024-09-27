import type { VariantProps } from 'class-variance-authority'
import type { HTMLMotionProps } from 'framer-motion'
import { m } from 'framer-motion'
import React from 'react'

import { cn } from '~/utils/cn'

import { LoadingCircle } from '../loading'
import { styledButtonVariant } from './variants'

export interface BaseButtonProps {
  isLoading?: boolean
}

export const MotionButtonBase = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<'button'>
>(({ children, ...rest }, ref) => (
  <m.button
    layout="size"
    initial
    whileFocus={{ scale: 1.02 }}
    whileTap={{ scale: 0.95 }}
    {...rest}
    ref={ref}
  >
    {children}
  </m.button>
))

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<
    Omit<HTMLMotionProps<'button'>, 'children'> &
      BaseButtonProps &
      VariantProps<typeof styledButtonVariant> & {
        buttonClassName?: string
      }
  >
>(
  (
    { className, buttonClassName, isLoading, variant, status, ...props },
    ref,
  ) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> =
      React.useCallback(
        (e) => {
          if (isLoading || props.disabled) {
            e.preventDefault()
            return
          }

          props.onClick?.(e)
        },
        [isLoading, props],
      )
    return (
      <MotionButtonBase
        ref={ref}
        className={cn(
          styledButtonVariant({
            variant,
            status: isLoading || props.disabled ? 'disabled' : undefined,
          }),
          className,
          buttonClassName,
        )}
        {...props}
        onClick={handleClick}
      >
        <span className="contents">
          {typeof isLoading === 'boolean' && (
            <m.span
              className="center"
              animate={{
                width: isLoading ? 'auto' : '0px',
              }}
            >
              {isLoading && (
                <LoadingCircle size="small" className="center mr-2" />
              )}
            </m.span>
          )}
          {props.children}
        </span>
      </MotionButtonBase>
    )
  },
)
