<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import type { ThemeName } from '@/stores/theme'
import BoardButton from '@/components/board/BoardButton.vue'
// import BoardSelect from '@/components/board/BoardSelect.vue' // actually the value of the import object is ambiquous
import QbSelect from '@/components/board/BoardSelect.vue'

console.log(QbSelect)

const themeStore = useThemeStore()

// [lesson] ref('sg') means the selected value is bound to the 'sg' string
const selected = ref('') 
const countries = [
  {
    value: 'sg',
    label: 'Singapore',
  },
  {
    value: 'my',
    label: 'Malaysia',
  },
  {
    value: 'jp',
    label: 'Japan',
  },
]

function selectTheme(theme: ThemeName) {
  themeStore.setTheme(theme)

  // [lesson] the magic is actually HERE
  document.documentElement.dataset.theme = theme
}

// same as showMessage, but using a arrow function (no access to context, check the value "this")
const showNotification = (message: string) => {
  alert(message);
};
// same as showNotification, but using a function
function showMessage(message: string) {
  alert(message);
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold">
        Themes
      </h1>

      <p class="text-gray-500">
        Preview BoardKit themes
      </p>
    </div>

    <div class="flex gap-3">
      <button
        class="rounded-md border px-4 py-2"
        @click="selectTheme('default')"
      >
        Default
      </button>

      <button
        class="rounded-md border px-4 py-2"
        @click="selectTheme('dark')"
      >
        Dark
      </button>
    </div>

    <div class="rounded-lg border p-6">
      Current theme:
      <strong>{{ themeStore.current }}</strong>
    </div>

    <div class="text-lg font-bold my-4 px-4">button(s) customized for demo purposes:</div>
  
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <!-- can be 65% of the width of the container -->
          <div class="w-65 text-right">customize / improvised:</div>
          <button class="bg-cyan-300 text-red-500 p-2 rounded-md hover:bg-cyan-400 cursor-pointer">Click me</button>
        </div>
        <div class="flex items-center gap-4">
          <!-- can be 1/3 of the width of the container -->
          <div class="w-1/3 text-right">danger button:</div>
          <button class="button button-danger" 
              @click="showNotification('DANGER');">DANGER</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">success button:</div>
          <button class="button button-success"
              @click="showMessage('SUCCESS');">SUCCESS</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">warning button:</div>
          <button class="button button-warning">Click me</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">info button:</div>
          <button class="button button-info">Click me</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">primary button:</div>
          <button class="button button-primary">Click me</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">secondary button:</div>
          <button class="button button-secondary">Click me</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">light button:</div>
          <button class="button button-light">Click me</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="w-1/3 text-right">dark button:</div>
          <button class="button button-dark">Click me</button>
        </div>
    </div>

    <div class="spacer mx-6">&nbsp;</div>
    <div class="text-lg font-bold my-4 px-4">button vs BoardButton component:</div>

    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">button primary (through taliwindcss):</div>
          <button class="button button-primary">Click me</button>
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">default BoardButton:</div>
          <BoardButton>Click me</BoardButton>
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">hard css override with {style}, some styles still need ! important <br/>
            (e.g. text-lg! reason is the default styles clash with your provided class):</div>
          <BoardButton class="bg-orange-500 text-lg! font-bold">Click me</BoardButton>
        </div>
    </div>

    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">using default props:</div>
          <BoardButton variant="success" size="sm" @click="showMessage('boardbutton success');">Click me</BoardButton>
          <span>varient=success, size=sm</span>
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">using default props:</div>
          <BoardButton variant="primary" size="md">Click me</BoardButton>
          <span>varient=primary, size=md</span>
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">using default props:</div>
          <BoardButton variant="danger" size="lg">Click me</BoardButton>
          <span>varient=danger, size=lg</span>
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">using default props:</div>
          <BoardButton variant="ghost" size="sm">Click me</BoardButton>
          <span>varient=ghost, size=sm</span>
        </div>
    </div>

    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-80 text-right">using default props:</div>
          <BoardButton variant="success" size="sm" disabled @click="showMessage('boardbutton success');">
            <span class="text-red-800">
              happy&nbsp;
            </span>
            <span class="text-white">
              birthday~
            </span>
          </BoardButton>
          <span>varient=success, size=sm, disabled</span>
        </div>
    </div>
    
    <div class="spacer mx-6">&nbsp;</div>
    <div class="text-lg font-bold my-4 px-4">BoardSelect component:</div>

    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-40 text-right">select (ordinary):</div>
          <div class="w-full">
            <select v-model="selected" class="w-full">
              <option value="">Select country</option>
              <option value="sg">Singapore</option>
              <option value="my">Malaysia</option>
              <option value="jp">Japan</option>
            </select>
          </div>
        </div>
    </div>
    <div class="flex flex-col gap-2 w-full max-w-3xl">
        <div class="flex items-center gap-4">
          <div class="w-10 text-right">board Select:</div>
          <div class="w-full">
            <!-- [lesson] placeholder is the text that is displayed when no option is selected (you can assign an option to bound to the empty string... optional) -->
            <qb-select
              v-model="selected"
              :options="countries"
              placeholder="Select country"
            ></qb-select>
          </div>
          <div class="w-30">
            <BoardButton variant="primary" size="md">hi</BoardButton>
          </div>
          <div class="w-30">
            <span>pick: {{ selected }}</span>
          </div>
        </div>
    </div>

  </div>
</template>