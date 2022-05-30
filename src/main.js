import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './firebase-messaging-sw'

createApp(App).use(store).use(router).mount('#app')

// navigator.serviceWorker.register("firebase-messaging-sw.js",{scope:"firebase-cloud-messaging-push-scope"})
