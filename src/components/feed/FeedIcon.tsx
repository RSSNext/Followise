import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { forwardRef, useMemo } from 'react'

import { cn } from '~/utils/cn'

import { getColorScheme, stringToHue } from '../../utils/color'
import { getImageProxyUrl, getUrlIcon } from '../../utils/img-proxy'
import { PlatformIcon } from '../platform-icon'

const getFeedIconSrc = ({
  src,
  siteUrl,
  fallback,
  proxy,
}: {
  src?: string
  siteUrl?: string
  fallback?: boolean
  proxy?: { height: number; width: number }
} = {}) => {
  // src ? getProxyUrl(src) : "";
  if (src) {
    if (proxy) {
      return [
        getImageProxyUrl({
          url: src,
          width: proxy.width,
          height: proxy.height,
        }),
        '',
      ]
    }

    return [src, '']
  }
  if (!siteUrl) return ['', '']
  const ret = getUrlIcon(siteUrl, fallback)

  return [ret.src, ret.fallbackUrl]
}

// const FallbackableImage = forwardRef<
//   HTMLImageElement,
//   {
//     fallbackUrl: string
//   } & React.ImgHTMLAttributes<HTMLImageElement>
// >(function FallbackableImage({ fallbackUrl, ...rest }, ref) {
//   return (
//     <img
//       onError={(e) => {
//         if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
//           e.currentTarget.src = fallbackUrl
//         } else {
//           rest.onError?.(e)
//           // Empty svg
//           e.currentTarget.src =
//             "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3C/svg%3E"
//         }
//       }}
//       {...rest}
//       ref={ref}
//     />
//   )
// })

export function FeedIcon({
  src,
  className,
  size = 20,
  fallback = true,
  siteUrl,
  name,
}: {
  src: string
  fallbackUrl?: string
  className?: string
  size?: number
  siteUrl?: string
  name?: string
  /**
   * Image loading error fallback to site icon
   */
  fallback?: boolean
}) {
  const image = src

  if (!siteUrl && image === undefined) {
    throw new Error('You must provide either a feed or a siteUrl')
  }

  const colors = useMemo(
    () => getColorScheme(stringToHue(siteUrl || src), true),
    [siteUrl, src],
  )
  let ImageElement: ReactNode
  let finalSrc = ''

  const sizeStyle = {
    width: size,
    height: size,
  }

  const fallbackIcon = (
    <span
      style={
        {
          ...sizeStyle,
          '--fo-light-background': colors.light.background,
          '--fo-dark-background': colors.dark.background,
        } as any
      }
      className={cn(
        'flex shrink-0 items-center justify-center rounded-sm',
        'bg-[var(--fo-light-background)] text-white dark:bg-[var(--fo-dark-background)]',
        'mr-2',
        className,
      )}
    >
      <span
        style={{
          fontSize: size / 2,
        }}
      >
        {name?.[0]?.toUpperCase()}
      </span>
    </span>
  )

  switch (true) {
    case !!siteUrl: {
      const [src] = getFeedIconSrc({
        siteUrl,
      })
      finalSrc = src

      ImageElement = (
        <PlatformIcon
          url={siteUrl}
          style={sizeStyle}
          className={cn('center mr-2', className)}
        >
          <m.img
            style={sizeStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </PlatformIcon>
      )
      break
    }
    case !!image: {
      finalSrc = getImageProxyUrl({
        url: image,
        width: size * 2,
        height: size * 2,
      })
      ImageElement = (
        <PlatformIcon
          url={image}
          style={sizeStyle}
          className={cn('center mr-2', className)}
        >
          <m.img
            className={cn('mr-2', className)}
            style={sizeStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </PlatformIcon>
      )
      break
    }

    default: {
      ImageElement = fallbackIcon
      break
    }
  }

  if (!ImageElement) {
    return null
  }

  if (fallback && !!finalSrc) {
    return (
      <Avatar className="shrink-0">
        <AvatarImage className="rounded-sm object-cover" asChild src={finalSrc}>
          {ImageElement}
        </AvatarImage>
        <AvatarFallback asChild>{fallbackIcon}</AvatarFallback>
      </Avatar>
    )
  }

  // Is Icon
  if (!finalSrc) return ImageElement
  // Else
  return (
    <Avatar className="shrink-0">
      <AvatarImage asChild src={finalSrc}>
        {ImageElement}
      </AvatarImage>
      <AvatarFallback>
        <div
          className={cn('mr-2', className)}
          style={sizeStyle}
          data-placeholder={finalSrc}
        />
      </AvatarFallback>
    </Avatar>
  )
}
