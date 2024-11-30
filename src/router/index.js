
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/Auth/LoginPage.vue';
import RegisterPage from '../components/Auth/RegisterPage.vue';
import UserDashboard from '../components/Dashboard/UserDashboard.vue';
import AdminDashboard from '../components/Dashboard/AdminDashboard.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/user-dashboard', component: UserDashboard },
    { path: '/admin-dashboard', component: AdminDashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
        