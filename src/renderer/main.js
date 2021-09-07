import FosungFront from 'fosung-front'
import FosungUI from 'fosung-ui'
import { menu } from './router'

import 'fosung-ui/lib/theme-chalk/index.css'
import 'fosung-front/lib/fosung-front.css'

const fosungFront = new FosungFront()

fosungFront.storeBuilder().addModules(require.context('@/store/', true, /\.js$/))
fosungFront.httpBuilder().api(require.context('@/api/', true, /\.js$/))
fosungFront.routerBuilder().menu(menu)
fosungFront.vueBuilder().install(FosungUI, { size: 'mini' }).components(require.context('@/components/', true, /\.vue$/)) // 注册全局组件

fosungFront.build()
