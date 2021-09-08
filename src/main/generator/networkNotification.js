import { app, Notification } from 'electron'
import { FOSUNG_APPID } from '../../constants'

const baseConfig = {
  title: '提示',
  subtitle: '重要通知',
  body: '',
  silent: false,
  icon: '',
  timeoutType: 'default'
}

function networkNotification (config) {
  app.setAppUserModelId(FOSUNG_APPID)
  const finalConfig = Object.assign({}, baseConfig, config)
  const notification = new Notification(finalConfig)
  notification.show()
}

export default networkNotification
