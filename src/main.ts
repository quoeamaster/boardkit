import { createApp } from 'vue'
import { createPinia } from 'pinia'

// loading general css styles
// also loading the `default` theme
import './style.css'
import './themes/default.css'
import './themes/dark.css'

import App from './App.vue'
import router from './router'

// set a default theme (first)
// [lesson] alternative way to set the theme
// document.documentElement.setAttribute('data-theme', 'default')
document.documentElement.dataset.theme = 'default';

const app = createApp(App)
    .use(router)
    .use(createPinia());

app.mount('#app')
