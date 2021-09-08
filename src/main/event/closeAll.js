import { findReopenMenuItem } from '../generator/menu'
import { app } from 'electron'

function closeAll () {
  const reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
  // 在macOS上，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

export default closeAll
