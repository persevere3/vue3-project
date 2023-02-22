import { createApp } from 'vue'
import App from './App.vue'
 
import router from './router'

import { createPinia } from 'pinia'
const pinia = createPinia()

import i18n from './plugins/lang'

import vue3GoogleLogin from 'vue3-google-login'

createApp(App).use(router).use(pinia).use(i18n).use(vue3GoogleLogin, {
  clientId: '877753746517-im9q8pu2baeidnbbfvg5duk06030s42i.apps.googleusercontent.com'
}).mount('#app')
