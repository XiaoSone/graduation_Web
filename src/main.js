import Vue from 'vue'
import App from './App.vue'
import $ from 'jquery';
import axios from 'axios';
window.$ = $;
window.jQuery = $;

import router from './router/router.js'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
}).$mount('#app')