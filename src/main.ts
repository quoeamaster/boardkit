import { createApp } from 'vue'
import { createPinia } from 'pinia'

// loading general css styles
// also loading the `default` theme
import './style.css'
import './themes/default.css'
import './themes/dark.css'

import App from './App.vue'
import router from './router'
import { isDebugModeOn } from '@/utils/debug'

// set a default theme (first)
// [lesson] alternative way to set the theme
// document.documentElement.setAttribute('data-theme', 'default')
document.documentElement.dataset.theme = 'default';

const app = createApp(App)
    .use(router)
    .use(createPinia());

// [lesson] globalProperties are available in every template as `$name`.
// That avoids repeating import.meta.env (and the helper) in each view.
app.config.globalProperties.$isDebugModeOn = isDebugModeOn

app.mount('#app')
