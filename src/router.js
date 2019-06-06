import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Game from './components/Game.vue'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import Analytics from './components/Analytics.vue'
import StudyGroup from './components/StudyGroup.vue'
import StudyPlan from './components/StudyPlan.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {   
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/game',
            name: 'game',
            component: Game
        },
        {
            path: '/analytics',
            name: 'Analytics',
            component: Analytics
        },
        {
            path: '/studyplan',
            name: 'studyplan',
            component: StudyPlan
        },
        {
            path: '/studygroup',
            name: 'Study Group',
            component: StudyGroup
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})