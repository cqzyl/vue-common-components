/*
 * @Author: ChenQiang
 * @Date: 2023-11-21 17:32:04
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-22 16:26:34
 * @FilePath: \src\KeepAliveC\index.ts
 */
import { App } from 'vue';
import KeepAliveC from './index.vue';

KeepAliveC.install = function (Vue: App) {
  Vue.component(KeepAliveC.name as string, KeepAliveC);
};

export default KeepAliveC;
