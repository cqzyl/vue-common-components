/*
 * @Description: 
 * @Author: ChenQiang
 * @Date: 2023-11-21 17:38:35
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-22 15:05:39
 * @FilePath: \src\main.ts
 */
import KeepAliveC from './KeepAliveC/index';
import { version } from '../package.json';

import { App } from 'vue';

const components = [KeepAliveC];

const install = function (Vue: App) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}
export { KeepAliveC, install };
export default { version, install };