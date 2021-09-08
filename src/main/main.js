'use strict'
import { app, protocol } from 'electron'
import createWindow from './window/createWindow'

// generate
import { generateMenu } from './generator/menu'
import generateDevTools from './generator/devtools'
import generateVariable from './generator/variable'
import generateContextMenu from './generator/context-menu'

// events
import closeAll from './event/closeAll'
import createMenu from './event/create-menu'
import initIpcEvent from './event/on'
import activate from './event/activate'

// quit
import quit from './event/quit'
import contextMenu from './event/context-menu'

// 在应用程序准备就绪之前，必须注册方案
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

/**
 * 1. ready方法将在Electron完成后调用
 * 2. 初始化并准备好创建浏览器窗口
 * 3. 某些API只能在此事件发生后使用
 */
app.on('ready', async () => {
  // 1. 生成调试工具
  await generateDevTools()
  // 2. 生成全局变量参数
  await generateVariable()
  // 3. 生成窗口
  const win = global.win = await createWindow()
  // 4. 自定义菜单
  await generateMenu()
  // 5. 初始化主进程和渲染进程的事件监听
  await initIpcEvent()
  // 通过webContents主动发送数据给渲染进程
  win.webContents.send('init', '这是主动触发的数据')
})

// 1. 激活macOs
app.on('activate', async () => {
  await activate()
})

// 1. 在创建新的 browserWindow 时发出
app.on('browser-window-created', (event, win) => {
  createMenu()
  contextMenu(win, generateContextMenu())
})

// 1. 关闭所有窗口后退出
app.on('window-all-closed', closeAll)

quit()
