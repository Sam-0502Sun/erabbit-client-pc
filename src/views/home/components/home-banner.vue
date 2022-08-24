<template>
  <div class="home-banner">
    <!-- :sliders="sliders"把获取的轮播图数据传递给轮播图组件 -->
    <XtxCarousel auto-play :sliders="sliders" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'

export default {
  name: 'HomeBanner',
  setup () {
    // 获取轮播图数据
    const sliders = ref([])
    findBanner().then(data => {
      sliders.value = data.result
    })
    return { sliders }
  }
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98
}
// 覆盖样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
