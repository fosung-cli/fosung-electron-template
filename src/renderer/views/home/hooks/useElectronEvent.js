
const useElectronEvent = (instance) => {
  instance.$electron.ipcRenderer.send('fs/message', '我是渲染进程')
  instance.$electron.ipcRenderer.on('init', (event, args) => {
    console.log('args', args)
  })
}

export default useElectronEvent
