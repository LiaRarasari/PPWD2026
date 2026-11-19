import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export default {
  getAllBarang() {
    return api.get('/barang')
  },
  getBarangById(id) {
    return api.get(`/barang/${id}`)
  },
  createBarang(data) {
    return api.post('/barang', data)
  },
  updateBarang(id, data) {
    return api.put(`/barang/${id}`, data)
  },
  deleteBarang(id) {
    return api.delete(`/barang/${id}`)
  }
}