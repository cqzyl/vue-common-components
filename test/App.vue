<!--
 * @Author: ChenQiang
 * @Date: 2023-11-20 09:51:53
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-22 09:21:43
 * @FilePath: \test\App.vue
-->
<template>
  <div>测试</div>
  <select v-model="value">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <KeepAliveC catchKey="testKey" :includes="['testKey1']">
    <test v-if="value === '1'" testKey="testKey1">box1</test>
    <test v-else-if="value === '2'" testKey="testKey2">box2</test>
    <test v-else testKey="testKey3">box3</test>
  </KeepAliveC>
</template>

<script setup>
import { ref } from 'vue'
import test from './test.vue';
import { KeepAliveC } from '../src';

const value = ref('1')
</script>
