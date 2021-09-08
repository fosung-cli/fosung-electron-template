import { BrowserWindow } from 'electron'
import createWindow from '../window/createWindow'

async function activate () {
  // 在macOS上，当单击dock图标且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow()
  }
}

export default activate
