const useWebView = () => {
  const webview = document.querySelector('webview')
  webview.addEventListener('did-start-loading', function () {
    console.log('努力加载中')
  })
  webview.addEventListener('did-stop-loading', function () {
    webview.insertCSS('#su { background: red!important }')
    webview.executeJavaScript(`
      setTimeout(() => {
        const input = document.querySelector('#kw')
        const btn = document.querySelector('#su')
        input.value = '福生佳信'
        btn.click()
      }, 3000)
    `)
  })
}

export default useWebView
