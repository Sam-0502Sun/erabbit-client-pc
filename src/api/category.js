// 定义分类相关的API接口函数

import request from '@/utils/request'

/**
 * 获取所有分类 （顶级，二级，对应商品推荐数据）
 * @returns {*|AxiosPromise}
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
