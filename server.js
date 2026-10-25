
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// GET: semua kegiatan
app.get('/api/kegiatan', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM kegiatan ORDER BY kegiatan_id'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: kegiatan berdasarkan ID
app.get('/api/kegiatan/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM kegiatan WHERE kegiatan_id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Kegiatan tidak ditemukan'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST: tambah kegiatan
app.post('/api/kegiatan', async (req, res) => {
  try {
    const {
      nama_kegiatan,
      deskripsi,
      tanggal,
      lokasi,
      status,
      kategori_id,
      dusun_id
    } = req.body;

    if (!nama_kegiatan || !tanggal || !lokasi || !kategori_id) {
      return res.status(400).json({
        message: 'Nama kegiatan, tanggal, lokasi, dan kategori_id wajib diisi'
      });
    }

    const result = await pool.query(
      `INSERT INTO kegiatan
       (nama_kegiatan, deskripsi, tanggal, lokasi, status, kategori_id, dusun_id)
       VALUES ($1, $2, $3, $4, COALESCE($5, 'direncanakan'), $6, $7)
       RETURNING *`,
      [
        nama_kegiatan,
        deskripsi ?? null,
        tanggal,
        lokasi,
        status ?? null,
        kategori_id,
        dusun_id ?? null
      ]
    );

    res.status(201).json({
      message: 'Kegiatan berhasil ditambahkan',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT: update kegiatan berdasarkan ID
app.put('/api/kegiatan/:id', async (req, res) => {
  try {
    const {
      nama_kegiatan,
      deskripsi,
      tanggal,
      lokasi,
      status,
      kategori_id,
      dusun_id
    } = req.body;

    if (!nama_kegiatan || !tanggal || !lokasi || !kategori_id) {
      return res.status(400).json({
        message: 'Nama kegiatan, tanggal, lokasi, dan kategori_id wajib diisi'
      });
    }

    const result = await pool.query(
      `UPDATE kegiatan SET
       nama_kegiatan = $1,
       deskripsi = $2,
       tanggal = $3,
       lokasi = $4,
       status = $5,
       kategori_id = $6,
       dusun_id = $7
       WHERE kegiatan_id = $8
       RETURNING *`,
      [
        nama_kegiatan,
        deskripsi ?? null,
        tanggal,
        lokasi,
        status ?? 'direncanakan',
        kategori_id,
        dusun_id ?? null,
        req.params.id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Kegiatan tidak ditemukan'
      });
    }

    res.json({
      message: 'Kegiatan berhasil diperbarui',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE: hapus kegiatan berdasarkan ID
app.delete('/api/kegiatan/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM kegiatan WHERE kegiatan_id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Kegiatan tidak ditemukan'
      });
    }

    res.json({
      message: 'Kegiatan berhasil dihapus',
      data: result.rows[0]
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Jalankan server
app.listen(process.env.PORT || 3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
