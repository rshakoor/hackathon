import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
Vue.config.productionTip = false


new Vue({
    router,
    store,
    created() {
        this.$vuetify.theme = {
                "primary": "#ff5722",
                "secondary": "#424242",
                "accent": "#82B1FF",
                "error": "#FF5252",
                "info": "#2196F3",
                "success": "#4CAF50",
                "warning": "#FB8C00"
            },
            this.$vuetify.iconfont = 'fa'
    },
    render: h => h(App)
}).$mount('#app')