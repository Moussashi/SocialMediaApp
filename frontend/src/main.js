import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store/index.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

const app = createApp(App)
app.component('fa', FontAwesomeIcon)
app.use(router)
app.use(store)


app.mount('#app')