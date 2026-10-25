# SIKDesa API — Sistem Informasi Kegiatan Desa

## 1. Deskripsi Proyek

SIKDesa API merupakan REST API yang dikembangkan untuk mendukung pengelolaan informasi kegiatan desa. API ini menggunakan Express.js sebagai framework backend dan PostgreSQL sebagai database yang dihosting melalui Neon.

Proyek ini dibuat untuk menerapkan konsep basis data relasional dan operasi CRUD (Create, Read, Update, Delete) melalui REST API.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- PostgreSQL
- Neon PostgreSQL
- Visual Studio Code
- Postman
- dbdiagram.io

## 3. Struktur Database

Database SIKDesa terdiri dari delapan tabel:

1. `dusun`
2. `warga`
3. `detail_warga`
4. `kategori_kegiatan`
5. `kegiatan`
6. `pendaftaran`
7. `panitia`
8. `tugas_panitia`

Relasi antartabel menggunakan primary key dan foreign key untuk menjaga keterkaitan data.

## 4. Endpoint API

Base URL: `http://localhost:3000`

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/kegiatan` | Menampilkan semua kegiatan |
| GET | `/api/kegiatan/:id` | Menampilkan kegiatan berdasarkan ID |
| POST | `/api/kegiatan` | Menambahkan kegiatan baru |
| PUT | `/api/kegiatan/:id` | Memperbarui data kegiatan |
| DELETE | `/api/kegiatan/:id` | Menghapus data kegiatan |

## 5. Cara Menjalankan Proyek

1. Pastikan Node.js sudah terpasang.
2. Buka terminal pada folder proyek.
3. Instal dependensi dengan perintah:

   `npm install`

4. Buat file `.env` berdasarkan konfigurasi database Neon milik sendiri, dengan variabel `DATABASE_URL` dan `PORT`.
5. Jalankan server menggunakan perintah:

   `node server.js`

6. Akses API melalui Postman menggunakan base URL `http://localhost:3000`.

Catatan: File `.env` berisi informasi koneksi database dan tidak boleh diunggah ke repositori publik atau disertakan dalam berkas pengumpulan.

## 6. Pengujian API

Pengujian dilakukan menggunakan Postman terhadap lima endpoint, yaitu GET semua kegiatan, GET kegiatan berdasarkan ID, POST, PUT, dan DELETE.

Bukti pengujian dan diagram ERD disimpan pada folder `screenshots/`.

## 7. Pengembang

Proyek: Sistem Informasi Kegiatan Desa (SIKDesa)  
Jenis aplikasi: REST API  
Database: PostgreSQL melalui Neon
Nama: Ahza Dwi Raharjo
