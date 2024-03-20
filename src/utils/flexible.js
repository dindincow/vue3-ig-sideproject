import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '@/constants/index'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
   return width.value <PC_DEVICE_WIDTH
})

/**
 * 動態指定 rem 基準，不能超過 40px
 */
export const useREM = () => {
   const MAX_FONT_SIZE = 40
   // 監聽 HTML 完成解析的事件
   document.addEventListener('DOMContentLoaded', () => {
      const html = document.querySelector('html')
      let fontSize = window.innerWidth / 10
      fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
      html.style.fontSize = fontSize + 'px'
   })
}
  