import FosungFront from 'fosung-front'
import FosungUI from 'fosung-ui'
import VueElectron from 'vue-electron'
import VueCompositionApi from '@vue/composition-api'
import { menu } from './router'

import 'fosung-ui/lib/theme-chalk/index.css'
import 'fosung-front/lib/fosung-front.css'

const fosungFront = new FosungFront()

fosungFront.storeBuilder().addModules(require.context('@/store/', true, /\.js$/))
fosungFront.httpBuilder().api(require.context('@/api/', true, /\.js$/))
fosungFront.routerBuilder().menu(menu).mode(process.env.IS_ELECTRON ? 'hash' : 'history')
fosungFront.vueBuilder().install(FosungUI, { size: 'mini' }).install(VueElectron).install(VueCompositionApi).components(require.context('@/components/', true, /\.vue$/)) // 注册全局组件

fosungFront.build()
