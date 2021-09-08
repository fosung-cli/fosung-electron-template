function contextMenu (win, menu) {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
}

export default contextMenu
