/* eslint-disable */
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import DashboardTrello from '@/components/DashboardTrello.vue';
import UserLogin from '@/components/UserLogin.vue';
import RecuperarSenha from '@/components/RecuperarSenha.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: UserLogin 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardTrello
  },
  {
    path: '/recuperar-senha',
    name: 'RecuperarSenha',
    component: RecuperarSenha
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

