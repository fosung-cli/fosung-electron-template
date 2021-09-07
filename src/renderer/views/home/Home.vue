<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <fs-button type="primary" @click="onClick">点击</fs-button>
    <a target="_blank" class="external-link" href="https://www.baidu.com">测试打开一个新的窗口</a>
    <webview id="vw" src="http://www.baidu.com" style="width: 640px; height: 480px;"></webview>
  </div>
</template>

<script>
import useWebView from './hooks/useWebView'
import useElectronEvent from './hooks/useElectronEvent'
// import fs from 'fs'

export default {
  name: 'Home',
  components: {
  },
  mounted () {
    useWebView()
    // fs.writeFileSync('./src/renderer/views/input.txt', '这是测试文件', (err, data) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log(data)
    //   }
    // })
    useElectronEvent(this)
    // this.$electron.ipcRenderer.send('fosung-init', { a: 1, b: 2 })
    // this.$electron.ipcRenderer.on('@fs/init', (event, args) => {
    //   console.log('args', args)
    // })
  },
  methods: {
    onClick () {
      this.$electron.ipcRenderer.send('fosung-init', { a: 1, b: 2 })
      // window.open('https://www.baidu.com', '_blank', 'top=500,left=200,nodeIntegration=no')
    }
  }
}
</script>
