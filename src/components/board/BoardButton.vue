<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'danger' | 'success' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'button',
  variant: 'primary',
  size: 'md',
})

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  // primary follows the active theme via the --bk-* CSS variables
  primary: 'bg-(--bk-color-primary) text-(--bk-color-background)',
  danger:  'bg-red-600 text-white hover:bg-red-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
  ghost:   'bg-transparent text-gray-800 hover:bg-gray-100',
}

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-4 text-lg font-bold',
}

const classes = computed(() => [
  // common layout/behavior shared by every variant
  'inline-flex items-center justify-center font-medium transition',
  'rounded-(--bk-radius-md)',
  'disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
  // variant classes based on logic-type (e.g. primary, danger, success, ghost)
  variantClasses[props.variant],
  // size classes based on size (e.g. sm, md, lg)
  sizeClasses[props.size],
])
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <!-- [lesson] the slot is the (optional) content of the button; theoretcally, you can add images, text surrounded by the button -->
    <slot />
  </button>
</template>

<style scoped>
/* [lesson] scoped styles are UNLAYERED css, so they beat Tailwind
   utilities (which live in the `utilities` cascade layer) no matter
   the specificity. Only put uncontested properties here — anything a
   variant class needs to override must be a utility class instead. */
button:hover:not(:disabled) {
  filter: brightness(0.92);
}
</style>