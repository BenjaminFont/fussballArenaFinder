import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/scss/app.scss"
import "bootstrap"
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { createApp } from 'vue'
import App from './App.vue'

createApp({extends:App}).use(SportsSoccerIcon).mount('#app')
