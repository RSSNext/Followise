// See https://wxt.dev/api/config.html
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'wxt'

const __dirname = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  browser: 'chrome',
  manifest: async () => {
    return {}
  },
  dev: {
    server: {
      port: 3334,
    },
  },
  alias: {
    '~': 'src',
  },
})
