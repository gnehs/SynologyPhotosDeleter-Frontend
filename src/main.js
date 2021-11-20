import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
import 'normalize.css'
import './main.sass'
createApp(App).use(router).mount('#app')
