import { Menu, app, shell, dialog } from 'electron'
import { isMacOS, isWindows } from '../config/config'
import commonMenu from '../config/menu'

const template = [
  {
    label: '编辑',
    submenu: [
      {
        label: '复制',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      },
      {
        label: '粘贴',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      },
      {
        label: '全选',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }
    ]
  },
  {
    label: '查看',
    submenu: commonMenu.concat([
      {
        label: '应用程序菜单演示',
        click: function (item, focusedWindow) {
          if (focusedWindow) {
            const options = {
              type: 'info',
              title: '应用程序菜单演示',
              buttons: ['好的'],
              message: '此演示用于 "菜单" 部分, 展示如何在应用程序菜单中创建可点击的菜单项.'
            }
            dialog.showMessageBox(focusedWindow, options, function () {
            })
          }
        }
      }
    ])
  },
  {
    label: '窗口',
    role: 'window',
    submenu: [
      {
        label: '最小化',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '关闭',
        accelerator: 'CmdOrCtrl+W',
        role: 'close'
      },
      {
        type: 'separator'
      },
      {
        label: '重新打开窗口',
        accelerator: 'CmdOrCtrl+Shift+T',
        enabled: false,
        key: 'reopenMenuItem',
        click: () => {
          app.emit('activate')
        }
      }]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: '学习更多',
        click: () => {
          shell.openExternal('http://electron.atom.io')
        }
      }
    ]
  }
]

if (isMacOS) {
  const name = app.getName()
  template.unshift(
    {
      label: name,
      submenu: [
        {
          label: `关于 ${name}`,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: '服务',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: `隐藏 ${name}`,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: '隐藏其它',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: '显示全部',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: '退出',
          accelerator: 'Command+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    })

  // 窗口菜单.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: '前置所有',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (isWindows) {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = app.getVersion()
  const updateItems = [
    {
      label: `版本 ${version}`,
      enabled: false
    },
    {
      label: '正在检查更新',
      enabled: false,
      key: 'checkingForUpdate'
    },
    {
      label: '检查更新',
      visible: false,
      key: 'checkForUpdate',
      click: () => {
        require('electron').autoUpdater.checkForUpdates()
      }
    },
    {
      label: '重启并安装更新',
      enabled: true,
      visible: false,
      key: 'restartToUpdate',
      click: () => {
        require('electron').autoUpdater.quitAndInstall()
      }
    }
  ]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(item => {
    if (item.submenu) {
      item.submenu.items.forEach(item => {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

function generateMenu () {
  return new Promise((resolve) => {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    resolve()
  })
}

export { template, findReopenMenuItem, generateMenu }
