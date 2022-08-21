<template>
  <!-- 顶部通栏 -->
  <AppNavbar />
  <!-- 头部组件 -->
  <AppHeader />
  <!-- 吸顶头部组件 -->
  <AppHeaderSticky />
  <!-- 内容容器 -->
  <div class="app-body">
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部组件 -->
  <AppFooter />
</template>

<script>
import AppNavbar from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import AppHeaderSticky from '@/components/app-header-sticky'
import AppFooter from '@/components/app-footer'
import { useStore } from 'vuex'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppHeaderSticky,
    AppFooter
  },
  //  获取分类数据
  setup () {
    const store = useStore()
    // dispatch调用store 里面的 actions
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
