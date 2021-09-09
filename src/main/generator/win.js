import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { isWindows, LOAD_URL, previewIcon, scheme, isDevelopment } from '../config/config'

async function generateWin () {
  const win = new BrowserWindow({
    width: 800, // 应用宽度
    height: 600, // 应用高度
    backgroundColor: '#FFF', // 应用的背景颜色
    center: true, // 窗口居中
    movable: true, // 是否可拖动窗口
    resizable: true, // 窗口大小可调整
    // frame: isWindows, // 不是windows系统时创建无边框窗口
    // titleBarStyle: 'hiddenInset', // 默认为default 在macOs才会出现一个隐藏的标题栏
    show: true, // 窗口在创建时就显示
    minimizable: true, // 窗口最小化 linux未实现
    maximizable: true, // 窗口最大化 linux未实现
    closable: true, // 窗口可关闭 linux未实现
    autoHideMenuBar: !isDevelopment, // 自动隐藏菜单栏
    title: isWindows ? '福生桌面端应用' : '',
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
  return win
}

export default generateWin
