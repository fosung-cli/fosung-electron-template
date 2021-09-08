import { onMounted, onUnmounted } from '@vue/composition-api'
import { on, off } from 'fosung-sdk'
import config from './config'

function useNetwork () {
  onMounted(() => {
    config.forEach(ev => {
      on(ev.el, ev.event, ev.handler)
    })
  })
  onUnmounted(() => {
    config.forEach(ev => {
      off(ev.el, ev.event, ev.handler)
    })
  })
}

export default useNetwork
