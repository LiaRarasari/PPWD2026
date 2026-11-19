import db from '../config/db.js'

export const getAllBarang = async () => {
  const [rows] = await db.query('SELECT * FROM barang ORDER BY id DESC')
  return rows
}

export const getBarangById = async (id) => {
  const [rows] = await db.query('SELECT * FROM barang WHERE id = ?', [id])
  return rows[0]
}

export const createBarang = async (data) => {
  const sql = `INSERT INTO barang
    (kode_barang, nama_barang, kategori, harga, stok, satuan)
    VALUES (?, ?, ?, ?, ?, ?)`
  const [result] = await db.query(sql, [
    data.kode_barang, data.nama_barang, data.kategori,
    data.harga, data.stok, data.satuan || 'pcs'
  ])
  return { id: result.insertId, data }
}

export const updateBarang = async (id, data) => {
  const sql = `UPDATE barang SET
    kode_barang = ?, nama_barang = ?, kategori = ?,
    harga = ?, stok = ?, satuan = ?
    WHERE id = ?`
  const [result] = await db.query(sql, [
    data.kode_barang, data.nama_barang, data.kategori,
    data.harga, data.stok, data.satuan, id
  ])
  return result.affectedRows > 0
}

export const deleteBarang = async (id) => {
  const [result] = await db.query('DELETE FROM barang WHERE id = ?', [id])
  return result.affectedRows > 0
}