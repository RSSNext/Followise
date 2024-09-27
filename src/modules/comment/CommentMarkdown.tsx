import type { MarkdownToJSX } from 'markdown-to-jsx'
import type { FC } from 'react'

import { Markdown } from '~/components/markdown'

const disabledTypes = [
  'footnote',
  'footnoteReference',

  'htmlComment',
  'htmlSelfClosing',
  'htmlBlock',
] as MarkdownToJSX.RuleName[]

export const CommentMarkdown: FC<{
  children: string
}> = ({ children }) => {
  return (
    <div className="contents">
      <Markdown
        disabledTypes={disabledTypes}
        disableParsingRawHTML
        forceBlock
        value={children}
      />
    </div>
  )
}
