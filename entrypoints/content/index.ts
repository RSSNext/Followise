import { browser } from 'wxt/browser'

export default defineContentScript({
  matches: ['*://*.follow.is/*'],
  world: 'MAIN',
  main() {
    injectScript(browser.runtime.getURL('/content-scripts/inject.js'), 'body')
  },
})

function injectScript(file_path: string, tag: string) {
  // eslint-disable-next-line unicorn/prefer-query-selector
  let node = document.getElementsByTagName(tag)[0]
  let script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', file_path)
  node.append(script)
}
