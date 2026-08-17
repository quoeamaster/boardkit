<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string
  label: string
}

interface Props {
  modelValue?: string
  options: Option[]
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(
  defineProps<Props>(),
  {
    modelValue: '',
    placeholder: 'Select...',
    disabled: false,
    size: 'md',
  },
)
const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-4 text-lg font-bold',
}

const classes = computed(() => [
  // common layout/behavior shared by every variant
  'w-full appearance-none select-chevron pr-8 border rounded-lg border-gray-300 py-1 outline-none transition disabled:cursor-not-allowed disabled:opacity-50',
  // size classes based on size (e.g. sm, md, lg)
  sizeClasses[props.size],
])

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement

  emit(
    'update:modelValue',
    target.value,
  )
}
</script>

<template>
  <select
    :value="props.modelValue"
    :disabled="props.disabled"
    :class="classes"
    @change="handleChange"
  >
    <option
      value=""
      disabled
    >
      {{ placeholder }}
    </option>

    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped>
/* the chevron arrow now comes from the .select-chevron component
   class in src/style.css */

/* select {
  background: var(--bk-color-surface);
  color: var(--bk-color-text);
  border-color: var(--bk-color-border);
  border-radius: var(--bk-radius-md);
}

select:focus {
  border-color: var(--bk-color-primary);
} */
</style>