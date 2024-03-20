<template>
  <mobileNavigationVue v-if="isMobileTerminal" :data="categoryData"></mobileNavigationVue>
  <div>
    提供即時新聞、天氣、購物、信箱、搜尋、政治、國際、運動、股市、娛樂、科技、電影、汽機車、玩樂、Podcast、動漫、遊戲。每天完成任務累積奇摩值，有趣又有用，
    ...
  </div>
  <div>
    提供即時新聞、天氣、購物、信箱、搜尋、政治、國際、運動、股市、娛樂、科技、電影、汽機車、玩樂、Podcast、動漫、遊戲。每天完成任務累積奇摩值，有趣又有用，
    ...
  </div>
  <div>
    提供即時新聞、天氣、購物、信箱、搜尋、政治、國際、運動、股市、娛樂、科技、電影、汽機車、玩樂、Podcast、動漫、遊戲。每天完成任務累積奇摩值，有趣又有用，
    ...
  </div>
</template>

<script setup>
import { ref } from 'vue'
import mobileNavigationVue from './mobile/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'
const categoryData = ref([])

const getCategoryData = async () => {
  const { categorys } = await getCategory()
  console.log('categorys', categoryData)
  categoryData.value = categorys
  categoryData.value.unshift(ALL_CATEGORY_ITEM)
}
getCategoryData()
</script>

<style lang="scss" scoped></style>
