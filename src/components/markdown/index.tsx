import { clsx } from 'clsx'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import { compiler } from 'markdown-to-jsx'
import type { FC, PropsWithChildren } from 'react'
import React, { memo, Suspense, useMemo, useRef } from 'react'

import styles from './markdown.module.css'

export interface MdProps {
  value?: string

  style?: React.CSSProperties
  readonly renderers?: Record<string, Partial<MarkdownToJSX.Rule>>
  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  codeBlockFully?: boolean
  className?: string
  as?: React.ElementType

  allowsScript?: boolean

  removeWrapper?: boolean
}

export const Markdown: FC<MdProps & MarkdownToJSX.Options & PropsWithChildren> =
  memo((props) => {
    const {
      value,
      renderers,
      style,
      wrapperProps = {},
      codeBlockFully = false,
      className,
      overrides,
      extendsRules,
      additionalParserRules,
      as: As = 'div',

      removeWrapper = false,

      ...rest
    } = props

    const ref = useRef<HTMLDivElement>(null)

    const node = useMemo(() => {
      const mdContent = value || props.children

      if (!mdContent) return null
      if (typeof mdContent != 'string') return null

      const mdElement = compiler(mdContent, {
        doNotProcessHtmlElements: ['tab', 'style', 'script'] as any[],
        wrapper: null,
        // @ts-ignore

        ...rest,
      })

      return mdElement
    }, [value, props.children, rest])

    if (removeWrapper) return <Suspense>{node}</Suspense>

    return (
      <Suspense>
        <As
          style={style}
          {...wrapperProps}
          ref={ref}
          className={clsx(
            styles['md'],
            codeBlockFully ? styles['code-fully'] : undefined,
            className,
          )}
        >
          {node}
        </As>
      </Suspense>
    )
  })
Markdown.displayName = 'Markdown'
