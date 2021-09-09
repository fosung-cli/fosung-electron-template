import { Menu, MenuItem } from 'electron'
import { commonMenu, editMenu } from '../config/menu'
export const menu = new Menu()

const allMenu = [].concat(editMenu, commonMenu)

function generateContextMenu () {
  allMenu.forEach(item => {
    menu.append(new MenuItem(item))
  })
  return menu
}

export default generateContextMenu
