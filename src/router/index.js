import { createRouter, createWebHistory } from 'vue-router'
import Index from '/src/pages/Index.vue'
import About from '/src/pages/About.vue'
const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router