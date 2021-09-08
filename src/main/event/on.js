import { ipcMain } from 'electron'
import notification from './../generator/notification'
import { FOSUNG_OFFLINE, FOSUNG_ONLINE } from '../../constants'

/**
 * @description 需要初始化的主进程的监听事件
 * @type {[{channel: string, listener: (function(*=, *=): *)}, {channel: string, listener: (function(*=, *=): *)}]}
 */
const events = [
  {
    channel: FOSUNG_OFFLINE,
    listener: (event, data) => {
      notification(data)
    }
  },
  {
    channel: FOSUNG_ONLINE,
    listener: (event, data) => {
      notification(data)
    }
  }
]

async function initIpcEvent () {
  events.forEach(ev => {
    ipcMain.on(ev.channel, ev.listener)
  })
}

export default initIpcEvent
