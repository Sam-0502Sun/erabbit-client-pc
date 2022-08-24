// 扩展vue原有功能： 全局组件，自定义指令，挂载原型方法
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了vue构造函数，在vue基础上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了已经创建的App应用实例，在app基础上扩展

import defaultImg from '@/assets/images/200.png'
// import XtxSkeleton from './xtx-skeleton'
// import XtxCarousel from './xtx-carousel'
// import XtxMore from './xtx-more'
// import XtxBread from './xtx-bread'
// import XtxBreadItem from './xtx-bread-item'

// context(目录路径， 是否加载子目录， 加载文件匹配的正则表达式)
const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    //  在app上进行扩展，app提供component directive 函数
    //  如果要挂载原型，app.config.globalProperties 的方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)

    // 使用 require 提供的函数 context 加载某一个目录下的所有 .vue 后缀的文件。
    // 然后 context 函数会返回一个导入函数 importFn
    // 它又一个属性 keys() 获取所有的文件路径
    //  通过文件路径数组，通过遍历数组，再使用 importFn 根据路径导入组件对象
    // 遍历的同时进行全局注册即可

    // 根据keys批量注册
    importFn.keys().forEach(path => {
      // 导入组件
      const component = importFn(path).default
      //  进行注册
      app.component(component.name, component)
    })

    //  定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
//  图片懒加载指令
//  原理：先存储图片地址不能放在src上， 当图片进入可视区，将地址设置给src
//  指令设置成lazy，在使用的时候就是v-lazy
  app.directive('lazy', {
    //  vue2.0监听使用指令DOM是否创建好，钩子函数：inserted
    //  vue3.0的指令拥有的钩子函数和组件一样， 使用指令DOM是否创建好，钩子函数：mounted
    mounted (el, binding) {
      //  创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 把指令的值设置给el的src属性 binding.value就是指令的值
          // 处理图片加载失败, error是图片加载失败的事件 load是图片加载成功
          el.onerror = () => {
            //  加载失败，设置默认图
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {}, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
