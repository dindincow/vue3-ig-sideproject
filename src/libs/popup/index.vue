<template>
  <div>
    <Teleport to="body">
      <!-- 蒙版 -->
      <Transition name="fade">
        <div v-if="isVisible" @click="isVisible = false" class="w-screen h-screen bg-black/80 z-40 fixed top-0 left-0">
          蒙版
        </div>
      </Transition>

      <!-- 內容 -->
      <transition name="popup-down-up">
        <!-- 所有綁定屬性都會傳給內容區 -->
        <div v-if="isVisible" v-bind="$attrs" class="w-screen fixed bg-white z-50 bottom-0">
          <slot></slot>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useScrollLock, useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:modelValue'])

// 透過 useVModel 會返回響應式數據，當值發生變化，會直接觸發 emit 修改 modelValue
const isVisible = useVModel(props)

// 鎖定滾動
const isLocked = useScrollLock(document.body)

watch(
  isVisible,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="css">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-from {
  transition: all 0.3s;
}

/* popup-down-up 展示动画 */
.popup-down-up-enter-active {
  transition: all 0.3s;
}
.popup-down-up-leave-active {
  transition: all 0.3s;
}
.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
