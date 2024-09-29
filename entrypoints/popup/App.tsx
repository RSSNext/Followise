import './App.css'

import Logo from '../../public/icon/128.png?url'

function App() {
  const openOnce = useRef(false)
  useEffect(() => {
    if (openOnce.current) return
    openOnce.current = true
    const openUrl = 'https://app.follow.is/'

    async function openTab() {
      const tabs = await browser.tabs.query({})

      const isExist = tabs.findIndex((tab) => tab.url?.startsWith(openUrl))

      if (isExist !== -1) {
        browser.tabs.update(tabs[isExist].id!, { active: true })
      } else {
        browser.tabs.create({ url: openUrl })
      }
    }
    openTab()
  }, [])
  return (
    <div>
      <div className="flex items-center gap-2">
        <img src={Logo} alt="Followise" className="size-16" />
        <h1 className="text-lg font-bold">Followise</h1>
      </div>

      <p className="px-4 pb-4 text-sm">
        This is an internal hackathon project developed over a two-day period.
        It is not recommended for production use.
        <br />
        <br />
        This Chrome extension is designed to explore additional features for the
        Follow product, extending its functionality beyond the core product.
        <br />
        <br />
        Please note that this plugin is purely experimental. Some features may
        potentially be integrated into Follow in the future.
      </p>
    </div>
  )
}

export default App
