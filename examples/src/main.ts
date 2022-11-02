import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import { track } from 'vue-half'

track({ reactive })
createApp(App).mount('#app')
