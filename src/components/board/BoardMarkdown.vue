<script setup lang="ts">
import MarkdownIt from 'markdown-it'

interface Props {
  content: string
}

// [lesson] if no need to provide init value
// const props = withDefaults(defineProps<Props>(), {
//   content: '## this is a markdown componnet, feel free to provide contents',
// })
const props = defineProps<Props>()

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

function renderMarkdown(content: string): string {
  return markdown.render(content)
}
</script>

<template>
  <div
    class="markdown prose max-w-none"
    v-html="renderMarkdown(props.content)"
  />
</template>

<style scoped>
.markdown {
  background: var(--bk-color-surface);
  color: var(--bk-color-text);
  border-color: var(--bk-color-border);
  border-radius: var(--bk-radius-md);
}
/* [lesson] :deep() is used to select the elements inside the markdown component */
.markdown :deep(h1) {
  color: var(--bk-color-text);
}
.markdown :deep(h2) {
  color: var(--bk-color-text);
}
.markdown :deep(h3) {
  color: var(--bk-color-text);
}
.markdown :deep(h4) {
  color: var(--bk-color-text);
}
.markdown :deep(h5) {
  color: var(--bk-color-text);
}
.markdown :deep(h6) {
  color: var(--bk-color-text);
}
.markdown :deep(a) {
  color: var(--bk-color-text);
}
</style>