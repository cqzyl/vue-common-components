/*
 * @Description: 
 * @Author: ChenQiang
 * @Date: 2023-11-21 17:38:35
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-22 17:32:29
 * @FilePath: \src\main.ts
 */
/// <reference path="shims-vue.d.ts"/>

import KeepAliveC from './KeepAliveC/index';
import { version } from '../package.json';

import { App } from 'vue';

const components = [KeepAliveC];

const install = function (Vue: App) {
  components.forEach((component) => {
    Vue.component(component.name as string, component);
  });
};
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}
export {
  KeepAliveC,
  KeepAliveC as KeepAliveA,
  install
};
export default { version, install };