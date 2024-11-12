import Router from 'vue-router'
import Vue from 'vue'

import Page1 from '../views/page1.vue'
import Page2 from '../views/page2.vue'
import Login from '../views/login.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/page2',
            name: 'page2',
            component: Page2
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

export default router