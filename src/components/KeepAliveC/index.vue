<!--
 * @Description: KeepAliveC
 * @Author: ChenQiang
 * @Date: 2023-11-20 09:59:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-21 14:33:13
 * @FilePath: \src\components\KeepAliveC\index.vue
-->
<template>
  <keep-alive
    :includes="includes"
    :exclude="exclude"
    :max="max"
  >
    <component :is="slotCom"></component>
  </keep-alive>
</template>

<script setup lang="ts">
import { computed, useSlots, watch } from 'vue';

interface IKeepAliveCProps {
  includes?: string | RegExp | Array<string | RegExp>;
  exclude?: string | RegExp | Array<string | RegExp>;
  max?: number | string;
  /**
   * 缓存属性名，默认为空，即使用组件名，
   */
  catchKey?: string,
}

const props = defineProps<IKeepAliveCProps>()

const slots = useSlots()

/** 缓存组件列表 */
const catchComs = new Map()

/** 待渲染组件 */
const slotCom = computed(() => {
  if (!props.catchKey) {
    const children = slots.default && slots.default()
    return children && children.length === 1 ? children[0] : children
  }
  return getComponent()
})

/** 最大缓存数量 */
const maxSize = computed(() => {
  return props.max || 10;
})

watch(() => props.includes, () => {
  callIncludes();
});
watch(() => props.exclude, () => {
  callExclude();
});
watch(() => props.max, () => {
  callMax()
});

/** 获取组件实例 */
function getComponent() {
  const children = slots.default && slots.default()

  if (!children || !children[0]) {
    return undefined
  }

  const renderDom = children[0]
  const catchComKey = renderDom.props && renderDom.props[props.catchKey!];
  const catchCom = catchComs.get(catchComKey);
  
  const nDom = {
    name: props.catchKey,
    render() {
      return renderDom;
    },
  };

  if (isIncludes(catchComKey) && isNotExclude(catchComKey)) {
    // 需要缓存此组件
    if (catchCom) {
      // 已存在缓存直接使用缓存
      
      // 刷新缓存,优化超限后缓存失效顺序
      catchComs.delete(catchComKey)
      catchComs.set(catchComKey, catchCom)

      return catchCom;
    }

    // 不存在缓存则创建新组件并设置新缓存
    catchComs.set(catchComKey, nDom)

    callMax()

    return nDom;
  } else if (catchCom) {
    // 不需要缓存此组件但已存在缓存的，移除缓存
    catchComs.delete(catchComKey)
  }

  return nDom;
}

/**
 * 是否包含属性判断
 * 返回是否需要缓存当前项
 */
function isIncludes(catchComKey: string) {
  /** 是否需要缓存当前组件 */
  if (!props.includes) {
    return true
  }

  if (typeof props.includes === 'string') {
    return catchComKey === props.includes;
  }

  if (props.includes instanceof RegExp) {
    return props.includes.test(catchComKey)
  }

  return !props.includes.length || props.includes.includes(catchComKey)
}

/**
 * 是否包含属性判断
 * 移除不需要缓存的项
 */
function callIncludes() {
  if (props.includes) {
    const catchKeys = catchComs.keys()

    let catchKey = catchKeys.next();

    while (catchKey.done) {
      if (!isIncludes(catchKey.value)) {
        catchComs.delete(catchKey.value)
      }
      catchKey = catchKeys.next()
    }
  }
}

/** 排除属性判断 */
function isNotExclude(catchComKey: string) {
  /** 是否需要缓存当前组件 */
  if (!props.exclude) {
    return true
  }

  if (typeof props.exclude === 'string') {
    return catchComKey !== props.exclude;
  }

  if (props.exclude instanceof RegExp) {
    return !props.exclude.test(catchComKey)
  }

  return !(props.exclude.length && props.exclude.includes(catchComKey))
}

/**
 * 排除属性判断
 * 移除不需要缓存的项
 */
 function callExclude() {
  if (props.exclude) {
    const catchKeys = catchComs.keys()

    let catchKey = catchKeys.next();

    while (catchKey.done) {
      if (isNotExclude(catchKey.value)) {
        catchComs.delete(catchKey.value)
      }
      catchKeys.next()
    }
  }
}

/** 缓存数量属性判断 */
function callMax() {
  const sizes = catchComs.size
  
  if (sizes >= parseInt(maxSize.value as string)) {
    // 按照最大缓存数量移除超出的项(按照构建逻辑，不会有一次插入多个项操作，所以此处仅删除最早插入的项)
    catchComs.delete(catchComs.keys().next().value)
    return true
  }
  return false
}
</script>
