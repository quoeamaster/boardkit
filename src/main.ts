import { createApp } from 'vue'
import { createPinia } from 'pinia'

// loading general css styles
// also loading the `default` theme
import './style.css'
import './themes/default.css'
import './themes/dark.css'

import { useConfigStore } from '@/stores/config'

import App from './App.vue'
import router from './router'
import { isDebugModeOn } from '@/utils/debug'

// set a default theme (first)
// [lesson] alternative way to set the theme
// document.documentElement.setAttribute('data-theme', 'default')
document.documentElement.dataset.theme = 'default';

const pinia = createPinia()
const configStore = useConfigStore(pinia)
await configStore.load(`${import.meta.env.BASE_URL}/${import.meta.env.VITE_CONFIG_FILE_LOCATION}`)

// [example] accessing the store
// console.log(configStore.getConfig)
// console.log(configStore.getLayoutFolder)
// console.log(configStore.getWidgetDefinitionsFolder)
// console.log(configStore.getComment)

const app = createApp(App)
    .use(router)
    .use(pinia);

// [lesson] globalProperties are available in every template as `$name`.
// That avoids repeating import.meta.env (and the helper) in each view.
app.config.globalProperties.$isDebugModeOn = isDebugModeOn

app.mount('#app')
