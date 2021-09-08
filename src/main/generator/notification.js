import { Notification } from 'electron'

const baseConfig = {
  title: '提示',
  subtitle: '重要通知',
  body: '',
  silent: false,
  icon: '',
  timeoutType: 'default'
}

function notification (config) {
  const finalConfig = Object.assign({}, baseConfig, config)
  const notification = new Notification(finalConfig)
  notification.show()
}

export default notification
