import { defineRunnerConfig } from 'wxt'

export default defineRunnerConfig({
  startUrls: ['https://dev.follow.is/feeds/all/61443195988604928?view=0'],
  chromiumArgs: ['--user-data-dir=./.dev-profile'],
  openConsole: true,
  openDevtools: true,
})
