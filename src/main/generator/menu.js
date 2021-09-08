import { app } from 'electron'

function generateWindowsMenus () {
  app.setUserTasks([
    {
      program: process.execPath,
      arguments: '--new-window',
      iconPath: process.execPath,
      iconIndex: 0,
      description: '创建一个新窗口'
    }
  ])
}

export default generateWindowsMenus
