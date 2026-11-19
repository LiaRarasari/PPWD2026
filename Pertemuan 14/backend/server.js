import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import barangRoutes from './routes/barangRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/barang', barangRoutes)

// Health check
app.get('/', (req, res) => res.json({ message: 'API Inventaris aktif' }))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`))