import * as barangModel from '../models/barangModel.js'

// GET /api/barang
export const getAll = async (req, res) => {
  try {
    const data = await barangModel.getAllBarang()
    res.json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET /api/barang/:id
export const getOne = async (req, res) => {
  try {
    const data = await barangModel.getBarangById(req.params.id)
    if (!data) return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' })
    res.json({ success: true, data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// POST /api/barang
export const create = async (req, res) => {
  try {
    const { kode_barang, nama_barang, harga, stok } = req.body
    if (!kode_barang || !nama_barang || harga == null || stok == null) {
      return res.status(400).json({
        success: false,
        message: 'kode_barang, nama_barang, harga, stok wajib diisi'
      })
    }
    const data = await barangModel.createBarang(req.body)
    res.status(201).json({ success: true, data })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Kode barang sudah ada' })
    }
    res.status(500).json({ success: false, message: err.message })
  }
}

// PUT /api/barang/:id
export const update = async (req, res) => {
  try {
    const ok = await barangModel.updateBarang(req.params.id, req.body)
    if (!ok) return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' })
    res.json({ success: true, message: 'Barang diperbarui' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// DELETE /api/barang/:id
export const remove = async (req, res) => {
  try {
    const ok = await barangModel.deleteBarang(req.params.id)
    if (!ok) return res.status(404).json({ success: false, message: 'Barang tidak ditemukan' })
    res.json({ success: true, message: 'Barang dihapus' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}