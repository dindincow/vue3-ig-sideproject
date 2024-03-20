<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden">
      <!-- 滑塊 -->
      <li ref="sliderTarget" :style="sliderStyle" class="absolute h-[22px] bg-slate-900 rounded-lg duration-200"></li>
      <!-- 漢堡按鈕 -->
      <li @click="onShowPopup" class="fixed top-0 right-0 h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>
      <!-- 選單 -->
      <li
        :ref="setItemRef"
        @click="onItemClick(index)"
        v-for="(item, index) in data"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4y"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isVisable">
      <Menu :categorys="data" @onItemClick="onItemClick" />
    </m-popup>
  </div>
  <div>X => : {{ ulScrollLeft }}</div>
</template>

<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import Menu from '@/views/main/components/menu/index.vue'

defineProps({
  data: {
    type: Array,
    required: true
  }
})

const currentCategoryIndex = ref(0)
const ulTarget = ref(null)
const isVisable = ref(false)

// 通過 vueuse 這個庫 => useScroll 可以獲取響應式的 scroll 滾動距離
const { x: ulScrollLeft } = useScroll(ulTarget)
let itemRefs = []

const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '54px'
})

// watch(currentCategoryIndex, (index) => {
//   // getBoundingClientRect() 函數，獲得元素的大小和位置
//   const { left, width } = itemRefs[index].getBoundingClientRect()
//   console.log('ulScrollLeft.value', ulScrollLeft.value)
//   console.log('left', left)
//   sliderStyle.value = {
//     // 滑塊的位置 = 滾動棟條位置 + 當前元素 left - ul 的padding
//     transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
//     width: `${width}px`
//   }
//   if (isVisable.value) {
//     isVisable.value = false
//     ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft
//   }
// })

watch(currentCategoryIndex, (value) => {
  const { left, width } = itemRefs[value].getBoundingClientRect()
  // 这里可以用 getComputedStyle 获取ul的padding
  let ulPadding = getComputedStyle(ulTarget.value, null).padding.slice(0, -2) // 这里因为这种方法获取的是 8px 这个带有px的字符串
  ulPadding = parseInt(ulPadding)
  sliderStyle.value = {
    // 滑块位置 = ul横向滚动的位置 + 当前元素相对于视口的left - ul的padding
    transform: `translateX(${ulScrollLeft.value + left - ulPadding}px)`,
    width: width + 'px'
  }
  console.log(ulTarget.value.scrollLeft)
  /**
   * 在弹出框打开时，说明这是由点击弹出框菜单触发的tab切换
   * 1.关闭弹出框
   * 2.在navigation点击较为靠后的菜单item时，需要让顶上的tab滚动相应的距离，
   *  不然就会让滑块看不见了（点击navigation显示以外的目录，滚动条不会自动滚到那里）
   */
  if (isVisable.value) {
    isVisable.value = false
    ulTarget.value.scrollLeft = left + ulTarget.value.scrollLeft
  }
})

// 獲取所有選單原素
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

const onItemClick = (index) => {
  currentCategoryIndex.value = index
  // isVisable.value = false
}

const onShowPopup = () => {
  isVisable.value = true
}

// 更新數據前清空選單原素
onBeforeUpdate(() => {
  itemRefs = []
})
</script>

<style lang="scss" scoped></style>
