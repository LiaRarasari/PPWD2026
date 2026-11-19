<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => Boolean(route.params.id))

const form = ref({
  kode_barang: '',
  nama_barang: '',
  kategori: '',
  harga: 0,
  stok: 0,
  satuan: 'pcs'
})

const errorMsg = ref('')
const submitting = ref(false)

onMounted(async () => {
  if (isEdit.value) {
    try {
      const res = await api.getBarangById(route.params.id)
      const data = res.data.data
      form.value = {
        kode_barang: data.kode_barang,
        nama_barang: data.nama_barang,
        kategori: data.kategori || '',
        harga: Number(data.harga),
        stok: Number(data.stok),
        satuan: data.satuan || 'pcs'
      }
    } catch (err) {
      errorMsg.value = 'Data barang tidak ditemukan'
    }
  }
})

const simpanData = async () => {
  errorMsg.value = ''
  submitting.value = true
  try {
    if (isEdit.value) {
      await api.updateBarang(route.params.id, form.value)
    } else {
      await api.createBarang(form.value)
    }
    router.push('/')
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      {{ isEdit ? 'Edit Data Barang' : 'Tambah Barang Baru' }}
    </h1>

    <div v-if="errorMsg" class="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
      {{ errorMsg }}
    </div>

    <form @submit.prevent="simpanData" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Kode Barang *</label>
        <input
          v-model="form.kode_barang"
          type="text"
          required
          placeholder="Contoh: BRG-006"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Nama Barang *</label>
        <input
          v-model="form.nama_barang"
          type="text"
          required
          placeholder="Nama barang"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <input
          v-model="form.kategori"
          type="text"
          placeholder="Contoh: Elektronik, Aksesoris"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
          <input
            v-model.number="form.harga"
            type="number"
            min="0"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Stok *</label>
          <input
            v-model.number="form.stok"
            type="number"
            min="0"
            required
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
          <input
            v-model="form.satuan"
            type="text"
            placeholder="pcs / unit"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="flex justify-end space-x-3 pt-4">
        <router-link
          to="/"
          class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Batal
        </router-link>
        <button
          type="submit"
          :disabled="submitting"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50"
        >
          {{ submitting ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </form>
  </div>
</template>