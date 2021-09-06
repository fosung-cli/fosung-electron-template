<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <button @click="onClick">点击</button>
    <a target="_blank" class="external-link" href="https://www.baidu.com">测试打开一个新的窗口</a>
    <webview id="vw" src="http://www.baidu.com" style="width: 640px; height: 480px;"></webview>
  </div>
</template>

<script>
// @ is an alias to /src
import useWebView from './hooks/useWebView'
import useElectronEvent from './hooks/useElectronEvent'
const fs = require('fs')
export default {
  name: 'Home',
  components: {
  },
  mounted () {
    useWebView()
    fs.writeFileSync('./src/renderer/views/input.txt', '这是测试文件', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    })
    useElectronEvent(this)
    // this.$electron.ipcRenderer.send('fs/message', '我是渲染进程')
    // this.$electron.ipcRenderer.on('init', (event, args) => {
    //   console.log('args', args)
    // })
  },
  methods: {
    onClick () {
      window.open('https://www.baidu.com', '_blank', 'top=500,left=200,nodeIntegration=no')
    }
  }
}
</script>
