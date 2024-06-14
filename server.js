const express = require('express');
const path = require('path');

const app = express();
const PORT = 9000;

// Middleware untuk menyajikan file statis dari folder 'dist'
app.use(express.static(path.resolve(__dirname, 'dist')));

// Endpoint untuk menyajikan halaman HTML utama
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Endpoint lainnya jika diperlukan

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
