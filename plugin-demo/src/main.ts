import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import SwipeModal from './SwipeModal'

const app = createApp(App)

app.use(SwipeModal, {
  teleportTarget: '#swipe-modal'
})

app.mount('#app')
