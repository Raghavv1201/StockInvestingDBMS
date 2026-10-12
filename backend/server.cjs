
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'StockInvestingDB',
  waitForConnections: true,
  connectionLimit: 10
});

// Test whether the backend can connect to MySQL
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT DATABASE() AS db, VERSION() AS version'
    );

    res.json({
      message: 'Backend connected to MySQL',
      ...rows[0]
    });
  } catch (error) {
    console.error('MySQL connection error:', error.message);

    res.status(500).json({
      error: 'Database connection failed. Check backend/.env and MySQL Server.'
    });
  }
});

// Get stocks from the existing Stock table
app.get('/api/stocks', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT Stock_ID, Stock_Name, Stock_Price, Exchange
      FROM Stock
      ORDER BY Stock_Name
    `);

    res.json(rows);
  } catch (error) {
    console.error('Stocks query error:', error.message);
    res.status(500).json({ error: 'Could not fetch stocks.' });
  }
});

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
