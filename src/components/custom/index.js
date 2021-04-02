import leftBorder from './leftBorder/LeftBorder.vue'
import minBorder from './minBorder/MinBorder.vue'


export default {
    install (Vue) {
        Vue.component('leftBorder', leftBorder)
        Vue.component('minBorder', minBorder)
    }
}