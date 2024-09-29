import type { toast } from 'sonner'

export interface RenderGlobalContext {
  /// Access Settings
  showSetting: (path?: string) => void

  /// Actions
  follow: (id: string, options?: { isList: boolean }) => void

  /// Utils
  toast: typeof toast

  getApiUrl: () => string
  profile: (id: string, variant: 'dialog' | 'drawer') => void
}

const PREFIX = '__follow'
function createProxy<T extends RenderGlobalContext>(path: string[] = []): T {
  return new Proxy((() => {}) as any, {
    get(_, prop: string) {
      const newPath = [...path, prop]

      return createProxy(newPath)
    },
    apply(_, __, args: any[]) {
      const methodPath = path.join('.')

      return new Function(
        `return globalThis.${PREFIX}.${methodPath}(${args
          .map((arg) => JSON.stringify(arg))
          .join(',')})`,
      )()
    },
  })
}
type AddPromise<T> = T extends (...args: infer A) => Promise<infer R>
  ? (...args: A) => Promise<R>
  : T extends (...args: infer A) => infer R
  ? (...args: A) => Promise<Awaited<R>>
  : any

type Fn<T> = {
  [K in keyof T]: AddPromise<T[K]> &
    (T[K] extends object ? { [P in keyof T[K]]: AddPromise<T[K][P]> } : never)
}
function callWindowExpose<T extends RenderGlobalContext>() {
  return createProxy() as Fn<T>
}

export const followBridge = callWindowExpose()
