import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/app.scss"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { createApp } from 'vue'
import App from './App.vue'
// add icons according to https://docs.fontawesome.com/web/use-with/vue/add-icons
import {faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons";

library.add(faEye, faEyeSlash)
createApp({extends:App}).mount('#app')
