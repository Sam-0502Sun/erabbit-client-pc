import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式的库
import 'normalize.css'
// 自己项目的公用样式
import '@/assets/styles/common.less'
// 导入自己的UI组件库
import UI from '@/components/library/index'

createApp(App)
  .use(store)
  .use(router)
  .use(UI)
  .mount('#app')
