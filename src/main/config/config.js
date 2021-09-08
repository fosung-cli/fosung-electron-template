import path from 'path'

export const isDevelopment = process.env.NODE_ENV === 'development'

export const scheme = 'app'
export const LOAD_URL = `${scheme}://./index.html`

export const previewIcon = isDevelopment ? 'public/images/favicon.ico' : `${global.__images}/favicon.ico`
export const isWindows = process.platform === 'win32'
export const isMacOS = process.platform === 'darwin'

if (!isDevelopment) {
  global.__img = path.join(__dirname, './img')
  global.__images = path.join(__dirname, './images')
}
