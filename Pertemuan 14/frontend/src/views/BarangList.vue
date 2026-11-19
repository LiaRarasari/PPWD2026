<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const barangList = ref([])
const loading = ref(true)
const error = ref('')

const fetchBarang = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await api.getAllBarang()
    barangList.value = res.data.data
  } catch (err) {
    error.value = 'Gagal memuat data barang. Pastikan server backend aktif.'
  } finally {
    loading.value = false
  }
}

const hapusBarang = async (id, nama) => {
  if (!confirm(`Yakin ingin menghapus "${nama}"?`)) return
  try {
    await api.deleteBarang(id)
    fetchBarang()
  } catch (err) {
    alert('Gagal menghapus barang')
  }
}

const formatRupiah = (angka) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka)
}

onMounted(fetchBarang)
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Daftar Inventaris Barang</h1>
      <router-link
        to="/tambah"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
      >
        + Tambah Barang
      </router-link>
    </div>

    <div v-if="loading" class="text-center py-8 text-gray-500">Memuat data...</div>
    <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded-lg">{{ error }}</div>

    <div v-else class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-100 border-b text-gray-700 text-sm uppercase">
            <th class="py-3 px-4">Kode</th>
            <th class="py-3 px-4">Nama Barang</th>
            <th class="py-3 px-4">Kategori</th>
            <th class="py-3 px-4">Harga</th>
            <th class="py-3 px-4">Stok</th>
            <th class="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="item in barangList" :key="item.id" class="hover:bg-gray-50">
            <td class="py-3 px-4 font-mono text-sm font-semibold text-blue-600">{{ item.kode_barang }}</td>
            <td class="py-3 px-4 font-medium text-gray-900">{{ item.nama_barang }}</td>
            <td class="py-3 px-4 text-gray-600">{{ item.kategori || '-' }}</td>
            <td class="py-3 px-4 text-gray-800">{{ formatRupiah(item.harga) }}</td>
            <td class="py-3 px-4">
              <span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                {{ item.stok }} {{ item.satuan }}
              </span>
            </td>
            <td class="py-3 px-4 text-center space-x-2">
              <router-link
                :to="`/edit/${item.id}`"
                class="inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1 rounded transition"
              >
                Edit
              </router-link>
              <button
                @click="hapusBarang(item.id, item.nama_barang)"
                class="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition"
              >
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="barangList.length === 0">
            <td colspan="6" class="py-6 text-center text-gray-500">Belum ada data barang.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>