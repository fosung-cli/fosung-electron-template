import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
  global.__img = path.join(__dirname, './img')
  global.__images = path.join(__dirname, './images')
}
export const scheme = 'app'
export const LOAD_URL = `${scheme}://./index.html`

export const previewIcon = isDev ? 'public/images/favicon.ico' : `${global.__images}/favicon.ico`
export const isWindows = process.platform === 'win32'
