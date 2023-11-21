<!--
 * @Description: KeepAlive2
 * @Author: ChenQiang
 * @Date: 2023-11-20 09:59:33
 * @LastEditors: ChenQiang
 * @LastEditTime: 2023-11-21 15:11:18
 * @FilePath: \src\components\KeepAlive2.vue
-->
<!-- <KeepAlive2 catchKey="testKey" :includes="['testKey1']">
  <test v-if="value === '1'" testKey="testKey1">box1</test>
  <test v-else-if="value === '2'" testKey="testKey2">box2</test>
  <test v-else testKey="testKey3">box3</test>
</KeepAlive2> -->
<template>
  <keep-alive
    :includes="includes"
    :exclude="exclude"
    :max="max"
  >
    <component :is="slotCom"></component>
  </keep-alive>
</template>

<script>
export default {
  name: 'KeepAlive2',
  props: {
    includes: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [Number, String],
    /**
     * 缓存属性名，默认为空，即使用组件名，
     */
    catchKey: {
      type: String,
    },
  },
  data() {
    return {
      catchCom: new Map(),
    };
  },
  computed: {
    slotCom() {
      if (!this.catchKey) {
        const children = this.$slots.default && this.$slots.default()
        return children && children.length === 1 ? children[0] : children
      }
      return this.getComponent()
    },
    maxSize() {
      return this.max || 10;
    },
  },
  methods: {
    getComponent() {
      const children = this.$slots.default && this.$slots.default()
      if (!children || !children[0]) {
        return undefined
      }
      const renderDom = children && children.length === 1 ? children[0] : children
      const catchComKey = renderDom.props[this.catchKey];
      const catchCom = this.catchCom.get(catchComKey);
      
      const nDom = {
        name: this.catchKey,
        render() {
          return renderDom;
        },
      };

      if (this.isIncludes(catchComKey) && this.isNotExclude(catchComKey)) {
        // 需要缓存此组件
        if (catchCom) {
          // 已存在缓存直接使用缓存
          
          // 刷新缓存,优化超限后缓存失效顺序
          this.catchCom.delete(catchComKey)
          this.catchCom.set(catchComKey, catchCom)

          return catchCom;
        }

        // 不存在缓存则创建新组件并设置新缓存
        this.catchCom.set(catchComKey, nDom)

        this.callMax()

        return nDom;
      } else if (catchCom) {
        // 不需要缓存此组件但已存在缓存的，移除缓存
        this.catchCom.delete(catchComKey)
      }

      return nDom;
    },
    /**
     * 是否包含属性判断
     * 返回是否需要缓存当前项
     */
    isIncludes(catchComKey) {
      /** 是否需要缓存当前组件 */
      if (!this.includes) {
        return true
      }

      if (typeof this.includes === 'string') {
        return catchComKey === this.includes;
      }

      if (this.includes instanceof RegExp) {
        return this.includes.test(catchComKey)
      }
      return !this.includes.length || this.includes.includes(catchComKey)
    },
    /**
     * 是否包含属性判断
     * 移除不需要缓存的项
     */
    callIncludes() {
      if (this.includes?.length) {
        const catchKeys = this.catchCom.keys()
        const catchKey = catchKeys.next();
        while (catchKey.done) {
          if (!this.includes.includes(catchKey.value)) {
            this.catchCom.delete(catchKey.value)
          }
          catchKey.next()
        }
      }
    },
    /** 排除属性判断 */
    isNotExclude(catchComKey) {
      /** 是否需要缓存当前组件 */
      if (!this.exclude) {
        return true
      }

      if (typeof this.exclude === 'string') {
        return catchComKey !== this.exclude;
      }

      if (this.exclude instanceof RegExp) {
        return !this.exclude.test(catchComKey)
      }
      return !(this.exclude.length && this.exclude.includes(catchComKey))
    },
    /**
     * 排除属性判断
     * 移除不需要缓存的项
     */
    callExclude() {
      if (this.exclude?.length) {
        const catchKeys = this.catchCom.keys()
        const catchKey = catchKeys.next();
        while (catchKey.done) {
          if (this.exclude.includes(catchKey.value)) {
            this.catchCom.delete(catchKey.value)
          }
          catchKey.next()
        }
      }
    },
    /** 缓存数量属性判断 */
    callMax() {
      const sizes = this.catchCom.size
      if (sizes >= this.maxSize) {
        // 按照最大缓存数量移除超出的项(按照构建逻辑，不会有一次插入多个项操作，所以此处仅删除最早插入的项)
        this.catchCom.delete(this.catchCom.keys().next().value)
        return true
      }
      return false
    },
  },
  watch: {
    includes() {
      this.callIncludes();
    },
    exclude() {
      this.callExclude();
    },
    max() {
      this.callMax()
    },
  },
}
</script>

