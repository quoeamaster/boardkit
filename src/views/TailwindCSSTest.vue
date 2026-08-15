<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'

// same as showMessage, but using a arrow function (no access to context, check the value "this")
const showNotification = (message: string) => {
  alert(message);
};
// same as showNotification, but using a function
function showMessage(message: string) {
  alert(message);
}

import { useThemeStore } from '@/stores/theme';

// [lesson] get the store instance
const themeStore = useThemeStore();
</script>

<template>
  <div class="italic">Current theme: <span class="text-red-500">{{ themeStore.current }}</span>
    <br/>(example on how to use the store and check persistence of store between views)</div>

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
  <div class="text-lg font-bold my-4 px-4">button vs quickboard-button:</div>


  <!-- remove this if you want to see the hello world component -->
  <!--HelloWorld /-->
</template>
