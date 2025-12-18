import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/traders',
        name: 'Traders',
        component: () => import('../views/Traders.vue')
    },
    {
        path: '/traders/:id',
        name: 'TraderDetail',
        component: () => import('../views/TraderDetail.vue')
    },
    {
        path: '/videos',
        name: 'Videos',
        component: () => import('../views/Videos.vue')
    },
    {
        path: '/strategies',
        name: 'Strategies',
        component: () => import('../views/Strategies.vue')
    },
    {
        path: '/ai-picks',
        name: 'AIStockPicker',
        component: () => import('../views/AIStockPicker.vue')
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard',
        component: () => import('../views/Leaderboard.vue')
    },
    {
        path: '/diagnosis',
        name: 'StockDiagnosis',
        component: () => import('../views/StockDiagnosis.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/membership',
        name: 'Membership',
        component: () => import('../views/Membership.vue')
    },
    {
        path: '/trading-records',
        name: 'TradingRecords',
        component: () => import('../views/TradingRecords.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/admin',
        component: () => import('../layouts/AdminLayout.vue'),
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            {
                path: '',
                name: 'AdminDashboard',
                component: () => import('../views/admin/AdminDashboard.vue')
            },
            {
                path: 'content',
                name: 'ManageContent',
                component: () => import('../views/admin/ManageContent.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

// Navigation Guard
router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('token')
    let user = {}
    try {
        const userStr = localStorage.getItem('user')
        if (userStr && userStr !== 'undefined') {
            user = JSON.parse(userStr)
        }
    } catch (e) {
        console.error('Error parsing user data:', e)
        localStorage.removeItem('user') // Clear corrupted data
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!loggedIn) {
            next('/login')
        } else {
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                if (user.role === 'admin') {
                    next()
                } else {
                    next('/')
                }
            } else {
                next()
            }
        }
    } else {
        next()
    }
})

export default router
