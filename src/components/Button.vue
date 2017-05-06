<template>
  <div
          class="border pointer py1 px2 inline-block align-middle"
          :class="[{
  'pointer': !disabled,
  'h-opacity-07 opacity-transition': !disabled && !selected,
  'cursor-not-allowed': disabled,
  'border-black': !selected && !color,
  'white': color,
  'gray-bg': selected
   }, `${color}-bg`]"
          @click="!disabled && $emit('click')"
          style="line-height: 22px; border-radius: 3px">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: ['disabled', 'selected', 'color'],
  }
</script>
