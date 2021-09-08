import { app } from 'electron'
import { FOSUNG_APPID } from '../../constants'
import generateWin from '../generator/win'

async function createWindow () {
  // 1. 设置appId
  app.setAppUserModelId(FOSUNG_APPID)
  // 2. 创建浏览器窗口
  return await generateWin()
}
export default createWindow
