import { createRouter, createWebHistory } from 'vue-router'
import BarangList from '../views/BarangList.vue'
import BarangForm from '../views/BarangForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'barang-list', component: BarangList },
    { path: '/tambah', name: 'barang-tambah', component: BarangForm },
    { path: '/edit/:id', name: 'barang-edit', component: BarangForm }
  ]
})

export default router