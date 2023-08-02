import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



import CardProduct from './components/Card/CardProduct.vue'
import Header from './components/Header/Header-nav.vue'
import Cart from './components/Cart/Cart-items.vue'
import LoginUser from './components/Login/Login-user.vue'

const app = createApp(App)

app.component('CardProduct', CardProduct)
app.component('HeaderNav', Header)
app.component('CartItems', Cart)
app.component('Login', LoginUser)

app.mount('#app')
