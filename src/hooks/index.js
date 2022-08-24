// 提供复用逻辑的函数 （钩子）
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 *数据懒加载
 * @param {Element} target --Dom对象
 * @param {Function} apiFn --API函数
 */
export const useLazyData = (apiFn) => {
  const result = ref([])
  const target = ref(null)
  // stop停止观察
  const { stop } = useIntersectionObserver(
    // target监听的目标元素
    target,
    // isIntersecting是否进入可视区  observerElement观察的元素
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        //  调用API函数获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    //  配置选项,相交的比例大于0 就触发
    {
      threshold: 0
    }
  )
  return { result, target }
}
