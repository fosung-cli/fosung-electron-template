import { ipcMain } from 'electron'

const events = [
  {
    channel: 'fosung-init',
    listener: (event, data) => {
      console.log(event, data)
      return data
    }
  }
]

export default function initIpcEvent () {
  events.forEach(ev => {
    ipcMain.on(ev.channel, ev.listener)
  })
}
