import { ipcRenderer } from 'electron'
import { FOSUNG_OFFLINE, FOSUNG_ONLINE } from '@c/index'

const events = [
  {
    el: window,
    event: 'online',
    handler: () => {
      ipcRenderer.send(FOSUNG_ONLINE, { body: '网络已链接' })
    }
  },
  {
    el: window,
    event: 'offline',
    handler: () => {
      ipcRenderer.send(FOSUNG_OFFLINE, { body: '网络已断开' })
    }
  }
]

export default events
