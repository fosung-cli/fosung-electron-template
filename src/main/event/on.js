import { BrowserWindow, ipcMain } from 'electron'
import geterateNotification from './../generator/notification'
import { menu } from '../generator/context-menu'
import { FOSUNG_OFFLINE, FOSUNG_ONLINE } from '../../constants'

/**
 * @description 需要初始化的主进程的监听事件
 * @type {[{channel: string, listener: (function(*=, *=): *)}, {channel: string, listener: (function(*=, *=): *)}]}
 */
const events = [
  {
    channel: FOSUNG_OFFLINE,
    listener: (event, data) => {
      geterateNotification(data)
    }
  },
  {
    channel: FOSUNG_ONLINE,
    listener: (event, data) => {
      geterateNotification(data)
    }
  },
  {
    channel: 'show-context-menu',
    listener: (event) => {
      const win = BrowserWindow.fromWebContents(event.sender)
      menu.popup({ window: win })
    }
  }
]

async function initIpcEvent () {
  events.forEach(ev => {
    ipcMain.on(ev.channel, ev.listener)
  })
}

export default initIpcEvent
