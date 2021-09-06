import { ipcMain } from 'electron'

const events = [
  {
    channel: '@fs/init',
    listener: (event, data) => {
      console.log(data)
    }
  }
]

export default function initIpcEvent () {
  events.forEach(ev => {
    ipcMain.on(ev.channel, ev.listener)
  })
}
