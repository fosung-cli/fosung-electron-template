import { isDevelopment, isWindows } from '../config/config'
import { app } from 'electron'

function quit () {
// 在开发模式下，根据父进程的请求干净地退出
  if (isDevelopment) {
    if (isWindows) {
      process.on('message', (data) => {
        if (data === 'graceful-exit') {
          app.quit()
        }
      })
    } else {
      process.on('SIGTERM', () => {
        app.quit()
      })
    }
  }
}

export default quit
