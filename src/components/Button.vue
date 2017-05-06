<template>
  <div
          class="border pointer py1 px2 inline-block align-middle"
          :class="{ 'pointer': !disabled, 'cursor-not-allowed': disabled, 'border-black': !selected, 'gray-bg': selected }"
          @click="!disabled && $emit('click')"
          style="line-height: 22px; border-radius: 3px">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: ['disabled', 'selected'],
  }
</script>
