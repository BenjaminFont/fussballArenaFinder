import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/app.scss"
import "bootstrap"
import { library } from '@fortawesome/fontawesome-svg-core'
import { createApp } from 'vue'
import App from './App.vue'
// add icons according to https://docs.fontawesome.com/web/use-with/vue/add-icons
import {faEye, faEyeSlash, faClock} from "@fortawesome/free-regular-svg-icons";
import { createI18n } from 'vue-i18n';


const datetimeFormats = {
    'en-US': {
        short: {
            year: 'numeric', month: 'short', day: 'numeric',
        },
        long: {
            year: 'numeric', month: 'short', day: 'numeric',
            weekday: 'short', hour: 'numeric', minute: 'numeric'
        },
        day: {
            month: 'short', day: 'numeric',
        },
        hour: {
            hour: 'numeric', minute: 'numeric', hour12: false
        }
    }
}
const i18n = createI18n({datetimeFormats});

library.add(faEye, faEyeSlash, faClock)
createApp({extends:App}).use(i18n).mount('#app')
