'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { isWindows, LOAD_URL, scheme, previewIcon } from './config/config'
import initIpcEvent from './event'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800, // 应用宽度
    height: 600, // 应用高度
    backgroundColor: '#FFF', // 应用的背景颜色
    center: true, // 窗口居中
    movable: true,
    resizable: true, // 窗口大小可调整
    // frame: isWindows, // 不是windows系统时创建无边框窗口
    // titleBarStyle: 'hiddenInset', // 默认为default 在macOs才会出现一个隐藏的标题栏
    show: true, // 窗口在创建时就显示
    minimizable: true, // 窗口最小化 linux未实现
    maximizable: true, // 窗口最大化 linux未实现
    closable: true, // 窗口可关闭 linux未实现
    autoHideMenuBar: !isDevelopment, // 自动隐藏菜单栏
    title: isWindows ? '网易云音乐' : '',
    icon: previewIcon, // 窗口的图标. 在 Windows 上推荐使用 ICO 图标来获得最佳的视觉效果,
    webPreferences: {
      devTools: isDevelopment,
      nodeIntegration: true, // 是否在Web工作器中启用了Node集成
      contextIsolation: false, // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true
      webSecurity: false, // 它将禁用同源策略
      webviewTag: true, // 启用webview组件
      javascript: true // 是否启用JavaScript
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 开发环境加载地址
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // 打开开发者工具
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol(scheme)
    // 默认加载的是index.html 可在这里配置其他路径 例如：app://./index.html/#/login
    await win.loadURL(LOAD_URL)
  }
  // 初始化主进程和渲染进程的事件监听
  await initIpcEvent()
  return win
}

// 关闭所有窗口后退出
app.on('window-all-closed', () => {
  // 在macOS上，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 激活macOs
app.on('activate', async () => {
  // 在macOS上，当单击dock图标且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow()
  }
})

/**
 * 1. ready方法将在Electron完成后调用
 * 2. 初始化并准备好创建浏览器窗口
 * 3. 某些API只能在此事件发生后使用
 */
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      // 下载vue-devtools
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  // 启动 Node.js 进程的可执行文件的绝对路径名
  global.execPath = process.execPath
  // 启动 Node.js 进程时传入的命令行参数数组
  global.argv = process.argv
  const win = global.win = await createWindow()
  // 通过webContents主动发送数据给渲染进程
  win.webContents.send('init', '这是主动触发的数据')
})

// 在开发模式下，根据父进程的请求干净地退出
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
