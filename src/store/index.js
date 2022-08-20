import { createStore } from 'vuex'
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
// 持久化插件
import createPersistedstate from 'vuex-persistedstate'

// vue2.0 创建仓库 new Vuex.store({})
// vue3.0 创建仓库 createStore({})
export default createStore({
  // 存储状态
  state: {},
  // 写计算属性
  getters: {},
  // 修改方法
  mutations: {},
  // 拿数据
  actions: {},
  // 分模块
  modules: {
    cart,
    category,
    user
  },
  // 配置插件
  plugins: [
    // 默认存储在localstorage
    createPersistedstate({
      // 存储是的名字
      key: 'erabbit-client-pc-store',
      // 存储哪些模块
      paths: ['user', 'cart']
    })
  ]
})
