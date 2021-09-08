import { ipcMain } from 'electron'
import { FOSUNG_OFFLINE, FOSUNG_ONLINE } from '../../constants'
import networkNotification from './../generator/networkNotification'

/**
 * @description 需要初始化的主进程的监听事件
 * @type {[{channel: string, listener: (function(*=, *=): *)}, {channel: string, listener: (function(*=, *=): *)}]}
 */
const events = [
  {
    channel: FOSUNG_OFFLINE,
    listener: (event, data) => {
      networkNotification(data)
    }
  },
  {
    channel: FOSUNG_ONLINE,
    listener: (event, data) => {
      networkNotification(data)
    }
  }
]

export default function initIpcEvent () {
  events.forEach(ev => {
    ipcMain.on(ev.channel, ev.listener)
  })
}
