import { Menu, MenuItem } from 'electron'
import commonMenu from '../config/menu'
export const menu = new Menu()

function generateContextMenu () {
  commonMenu.forEach(item => {
    menu.append(new MenuItem(item))
  })
  return menu
}

export default generateContextMenu
