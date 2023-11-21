/*
 * @Description: 全局声明文件
 * @Author: ChenQiang
 * @Date: 2021-12-24 10:43:55
 * @LastEditors: ChenQiang
 * @LastEditTime: 2022-02-15 11:04:50
 * @FilePath: \src\env.d.ts
 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
