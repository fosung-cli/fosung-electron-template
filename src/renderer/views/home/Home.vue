<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <fs-button type="primary">点击</fs-button>
    <a target="_blank" class="external-link" href="https://www.baidu.com">测试打开一个新的窗口</a>
<!--    <webview id="vw" src="http://www.baidu.com" style="width: 640px; height: 480px;"></webview>-->
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useNetwork from '../../hooks/network'
// import useWebView from './hooks/useWebView'
// import useElectronEvent from './hooks/useElectronEvent'
// import fs from 'fs'
export default defineComponent({
  name: 'Home',
  setup () {
    useNetwork()
    return {}
  }
})
</script>
