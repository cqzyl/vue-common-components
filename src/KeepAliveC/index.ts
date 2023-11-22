/*
 * @Author: ChenQiang
 * @Date: 2023-11-21 17:32:04
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-21 17:35:54
 * @FilePath: \src\components\KeepAliveC\index.ts
 */
import { App } from 'vue';
import KeepAliveC from './index.vue';

KeepAliveC.install = function (Vue: App) {
  Vue.component(KeepAliveC.name, KeepAliveC);
};

export default KeepAliveC;
