/*
 * @Description: 全局声明文件
 * @Author: ChenQiang
 * @Date: 2021-12-24 10:43:55
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-22 15:53:16
 * @FilePath: \src\shims-vue.d.ts
 */
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
