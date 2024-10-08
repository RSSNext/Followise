import * as RadixAvatar from '@radix-ui/react-avatar'
import type { DetailedHTMLProps, FC, ImgHTMLAttributes, JSX } from 'react'
import React, { createElement, useMemo, useRef, useState } from 'react'

import { clsxm } from '~/utils/cn'
import { getColorScheme, stringToHue } from '~/utils/color'

interface AvatarProps {
  url?: string
  imageUrl?: string
  size?: number

  wrapperProps?: JSX.IntrinsicElements['div']

  shadow?: boolean
  text?: string
  randomColor?: boolean
  radius?: number | 'full'

  lazy?: boolean
}

const noop = {} as any

export const Avatar: FC<
  AvatarProps &
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = (props) => {
  const {
    shadow = true,
    lazy = true,
    wrapperProps = noop,
    size,
    imageUrl,
    text,
    url,
    randomColor,
    radius,
    ...imageProps
  } = props
  const avatarRef = useRef<HTMLDivElement>(null)

  const [loaded, setLoaded] = useState(!lazy)
  const [loadError, setLoadError] = useState(false)

  const { className, ...restProps } = wrapperProps
  const colors = useMemo(
    () =>
      (text || imageUrl) &&
      randomColor &&
      (getColorScheme(stringToHue(text || imageUrl!)) as any),
    [text, imageUrl, randomColor],
  )

  const bgColor = colors?.light.background

  return (
    <div
      className={clsxm(
        'backface-hidden box-border',
        shadow && 'shadow-sm',
        className,
      )}
      ref={avatarRef}
      style={{
        ...(size
          ? { height: `${size || 80}px`, width: `${size || 80}px` }
          : undefined),
        ...(bgColor ? { backgroundColor: bgColor } : undefined),
        ...(radius
          ? { borderRadius: radius === 'full' ? '100%' : `${radius}px` }
          : undefined),
      }}
      {...restProps}
    >
      {createElement(
        url ? 'a' : 'div',
        {
          className: 'relative inline-block h-full w-full',

          ...(url
            ? {
                href: url,
                target: '_blank',
                rel: 'noreferrer',
              }
            : {}),
        },
        imageUrl && !loadError ? (
          <div
            className={clsxm(
              'size-full bg-cover bg-center bg-no-repeat transition-opacity duration-300',
              className,
            )}
          >
            <RadixAvatar.Root>
              <RadixAvatar.Image
                src={imageUrl}
                style={{
                  opacity: loaded ? 1 : 0,
                  ...(radius
                    ? {
                        borderRadius:
                          radius === 'full' ? '100%' : `${radius}px`,
                      }
                    : undefined),
                }}
                height={size}
                width={size}
                onLoad={() => setLoaded(true)}
                onError={() => setLoadError(true)}
                loading={lazy ? 'lazy' : 'eager'}
                {...imageProps}
                className={clsxm(
                  'aspect-square duration-200',
                  imageProps.className,
                )}
              />
              <RadixAvatar.Fallback
                delayMs={600}
                style={{
                  height: `${size}px`,
                  width: `${size}px`,
                }}
                className={clsxm(
                  'rounded-full size-full block shrink-0',
                  imageProps.className,
                )}
              />
            </RadixAvatar.Root>
          </div>
        ) : text ? (
          <div
            className="relative flex size-full grow select-none items-center justify-center"
            style={{
              backgroundColor: bgColor,
              ...(radius
                ? { borderRadius: radius === 'full' ? '100%' : `${radius}px` }
                : undefined),
            }}
          >
            {text[0]}
          </div>
        ) : null,
      )}
    </div>
  )
}
