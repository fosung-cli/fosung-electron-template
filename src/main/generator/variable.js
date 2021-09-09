async function generateVariable () {
  // 启动 Node.js 进程的可执行文件的绝对路径名
  global.execPath = process.execPath
  // 启动 Node.js 进程时传入的命令行参数数组
  global.argv = process.argv

  return Promise.resolve()
}

export default generateVariable
