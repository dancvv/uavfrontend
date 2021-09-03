import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
mapboxgl.accessToken='pk.eyJ1IjoidHJhbnNjZW5kdHJlZSIsImEiOiJja3N6eHRiMzkxeXNzMm90Y2Rhd2JmbjNqIn0.bCRv7xB55jHSDwEF5y5DcA'

const app=createApp(App)
app.use(ElementPlus)
app.use(mapboxgl)
app.mount('#app')


