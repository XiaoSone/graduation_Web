import Router from 'vue-router'
import Vue from 'vue'

import Login from '../views/login.vue'

import Schoose from '../views/student/schoose.vue'
import Scontent from '../views/student/scontent.vue'
import Score from '../views/student/score.vue'
import Sdbinfo from '../views/student/sdbinfo.vue'
import Sdownload from '../views/student/sdownload.vue'
import Sktbg from '../views/student/sktbg.vue'
import Smdb from '../views/student/smdb.vue'
import Smdbinfo from '../views/student/smdbinfo.vue'
import Szqjc from '../views/student/szqjc.vue'
import Sindex from '../views/student/sindex.vue'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/tindex',
            name: 'tindex',
            component: () =>
                import ('../views/teacher/Tindex.vue'),
            children: [{
                    path: '',
                    component: () =>
                        import ('../views/teacher/Tcontent.vue')
                },
                {
                    path: '/tcontent',
                    component: () =>
                        import ('../views/teacher/Tcontent.vue')
                },
                {
                    path: '/tkt',
                    component: () =>
                        import ('../views/teacher/Tkt.vue')
                },
                {
                    path: '/tinfo',
                    name: 'tinfo',
                    component: () =>
                        import ('../views/teacher/Tinfo.vue')
                },
                {
                    path: '/Tktbg',
                    name: 'Tktbg',
                    component: () =>
                        import ('../views/teacher/Tktbg.vue')
                },
                {
                    path: '/tsure',
                    name: 'tsure',
                    component: () =>
                        import ('../views/teacher/Tsure.vue')
                },
                {
                    path: '/tstudentlist',
                    name: 'tstudentlist',
                    component: () =>
                        import ('../views/teacher/Tstudentlist.vue')
                },
                {
                    path: '/tstudentlist2',
                    name: 'tstudentlist2',
                    component: () =>
                        import ('../views/teacher/Tstudentlist2.vue')
                },
                {
                    path: '/tmdbstudentlist',
                    name: 'tmdbstudentlist',
                    component: () =>
                        import ('../views/teacher/Tmdbstudentlist.vue')
                },
                {
                    path: '/tstudentdown',
                    name: 'tstudentdown',
                    component: () =>
                        import ('../views/teacher/Tstudentdown.vue')
                },
                {
                    path: '/tstudentinfo',
                    name: 'tstudentinfo',
                    component: () =>
                        import ('../views/teacher/Tstudentinfo.vue')
                },
                {
                    path: '/tstudentlunwen',
                    name: 'tstudentlunwen',
                    component: () =>
                        import ('../views/teacher/Tstudentlunwen.vue')
                },
                {
                    path: '/tstudentscore',
                    name: 'tstudentscore',
                    component: () =>
                        import ('../views/teacher/Tstudentscore.vue')
                },
                {
                    path: '/tsuremdb',
                    name: 'tsuremdb',
                    component: () =>
                        import ('../views/teacher/Tsuremdb.vue')
                },
                {
                    path: '/tzqjc',
                    name: 'tzqjc',
                    component: () =>
                        import ('../views/teacher/Tzqjc.vue')
                },
                {
                    path: '/tyansou',
                    name: 'tyansou',
                    component: () =>
                        import ('../views/teacher/Tyansou.vue')
                }

            ]
        },
        {
            path: '/sindex',
            name: 'sindex',
            component: Sindex,
            children: [{
                    path: '',
                    name: 'scontent',
                    component: Scontent
                }, {
                    path: '/scontent',
                    name: 'scontent',
                    component: Scontent
                },
                {
                    path: '/schoose',
                    name: 'schoose',
                    component: Schoose
                },
                {
                    path: '/sktbg',
                    name: 'sktbg',
                    component: Sktbg
                },
                {
                    path: '/szqjc',
                    name: 'szqjc',
                    component: Szqjc
                },
                {
                    path: '/smdb',
                    name: 'smdb',
                    component: Smdb
                },
                {
                    path: '/sdbinfo',
                    name: 'sdbinfo',
                    component: Sdbinfo
                },
                {
                    path: '/score',
                    name: 'score',
                    component: Score
                },
                {
                    path: '/smdbinfo',
                    name: 'smdbinfo',
                    component: Smdbinfo
                },
                {
                    path: '/sdownload',
                    name: 'sdownload',
                    component: Sdownload
                }
            ]
        }
    ]
})

export default router