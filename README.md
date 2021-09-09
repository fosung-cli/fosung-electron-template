#### 图片需要
macOs安装图片  后缀.icns类型
windows 安装图片 后缀.ico类型
windows 卸载图片 uninset.ico图表
通用图片 icon.ico

#### 问题
1. 如果控制台输出的是乱码， 在serve的时候需要加上 chcp 65001
2. 如果需要调用其他的应用程序，需要该应用程序安装的绝对路径

### 打开新窗口
1. 在设置sandBox或者nativeWindowOpen选项时，将创建一个浏览器窗口。
2. 新窗口将在同一进程中创建，从而使父窗口能够直接访问子窗口
3. BrowserWindow构造函数选项的设置顺序是：
   1. 从window.open（）的features字符串中解析的选项、从父级继承的与安全相关的webPreferences，以及WebContent.setWindowOpenHandler提供的选项。
   2. 注意，WebContent.setWindowOpenHandler具有最终发言权和完全权限，因为它是在主进程中调用的。

```javascript
    // 说明：
    // 如果在父窗口中禁用了 Node integration, 则在打开的 window 中将始终被禁用。
    // 如果在父窗口中启用了上下文隔离, 则在打开的 window 中将始终被启用。
    // 父窗口禁用 Javascript，打开的 window 中将被始终禁用
window.open('http://www.baidu.com', '_black', 'top=500,left=200, nodeIntegration=no')
```

```shell
lerna publish --conventional-commits
"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
```
