import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import 'animate.css'  // 替换为 animate.css

// 引入全局样式
import './assets/scss/global.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(naive)

app.mount('#app')