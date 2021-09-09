import { findReopenMenuItem } from '../generator/menu'

function createMenu () {
  const reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) {
    reopenMenuItem.enabled = true
  }
}

export default createMenu
