import express from 'express';
import { Pool } from 'pg';

const app = express();
const port = 3000;

// Подключение к PostgreSQL
const pool = new Pool({
  host: 'db',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'bpms',
});

app.get('/api/processes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM processes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});