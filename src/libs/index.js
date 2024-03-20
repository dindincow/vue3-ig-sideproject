import { defineAsyncComponent } from 'vue'
import svgIcon from './svg-icon/index.vue'
import popup from './popup/index.vue'

// 註冊全局組件讓全局使用
export default {
  install(app) {
    /**
     * 組件註冊基本方式
     */
    // app.component('m-svg-icon', svgIcon)
    // app.component('m-popup', popup)

    /**
     * 組件註冊進階方式
     * 1. 獲取當前路徑下所有文件
     * 2. 遍利獲取組件模塊
     * 3. 利用 app.component 註冊
     */
    const components = import.meta.glob('./*/index.vue')
    for (const [key, value] of Object.entries(components)) {
      // 拼接組件 name
      const componentName = 'm-' + key.replace('./', '').split('/')[0]
      // 通过 defineAsyncComponent 異部導入指定路径下的组件
      app.component(componentName, defineAsyncComponent(value))
    }
  }
}
