# vue-common-components

> vue3 组件库

## Project setup
> node version >= 16.x.x
```
npm install
```

### Compiles and hot-reloads for node
```
npm run serve
```

## 组件

### 1. KeepAliveC

> 功能说明：基于vue内置组件，增加 `catchKey` 参数，可自定义缓存时使用的组件属性

组件使用示例.vue

仅缓存 `testKey="testKey1"` 的组件
```html
<template>
  <select v-model="value">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <KeepAlive2 catchKey="testKey" :includes="['testKey1']">
    <test v-if="value === '1'" testKey="testKey1">box1</test>
    <test v-else-if="value === '2'" testKey="testKey2">box2</test>
    <test v-else testKey="testKey3">box3</test>
  </KeepAlive2>
</template>

<script>
export default {
  data() {
    return {
      value: '1'
    };
  },
  components: { KeepAlive2, test },
}
</script>
```
API

| 参数 | 说明 | 默认值 |
| --- | --- | --- |
| catchKey | 缓存对应的组件props参数key，不填则默认使用组件name进行缓存判断 | - |
| includes | 缓存的key值。同keep-alive组件includes | - |
| exclude | 不缓存的key值。同keep-alive组件exclude | - |
| max | 最大缓存组件数量。同keep-alive组件max | 10 |





