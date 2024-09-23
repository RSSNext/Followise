import { useSetAtom } from 'jotai'
import type { FC } from 'react'
import React from 'react'
import { createPortal } from 'react-dom'

export const EntryColumnExtra: FC<{
  portalElement: HTMLElement
}> = ({ portalElement }) => {
  return null

  const [teleportElements, setTeleportElements] = useState([] as HTMLElement[])

  useEffect(() => {
    if (!portalElement) return

    const ob = new MutationObserver(() => {
      const $elements = portalElement.querySelectorAll('[data-entry-id]')
      setTeleportElements(Array.from($elements).map((e) => e as HTMLElement))
    })

    ob.observe(portalElement, {
      childList: true,
      subtree: true,
    })
    return () => {
      ob.disconnect()
    }
  }, [portalElement])

  return (
    <>
      {teleportElements.map((e) => (
        <PortalTo key={e.dataset.entryId} portalElement={e}>
          1111
        </PortalTo>
      ))}
    </>
  )
}

const PortalTo: FC<{
  portalElement: HTMLElement
  children: React.ReactNode
}> = ({ portalElement, children }) => {
  return createPortal(children, portalElement)
}
