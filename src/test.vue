<!--
 * @Description: 
 * @Author: ChenQiang
 * @Date: 2023-11-20 15:47:35
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-20 15:54:57
 * @FilePath: \test\test.vue
-->
<template>
  <div>
    test box
    <slot></slot>
  </div>
</template>

<script setup>
import { onActivated, onMounted } from 'vue';

onMounted(() => {
  console.log('onMounted')
})

onActivated(() => {
  console.log('onActivated')
})
</script>
