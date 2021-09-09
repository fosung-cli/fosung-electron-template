import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { isDevelopment } from '../config/config'

async function generateDevTools () {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      // 下载vue-devtools
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
}

export default generateDevTools
