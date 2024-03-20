import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useREM } from './utils/flexible'
import './style.css'
// 註冊 SVG-ICON
import 'virtual:svg-icons-register'

import mLibs from './libs'

useREM()
createApp(App).use(router).use(mLibs).mount('#app')
