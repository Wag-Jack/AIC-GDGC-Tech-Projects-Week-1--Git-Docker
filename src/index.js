const express = require('express');
const {Pool} = require('pg');

const app = express();
const db = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
});

app.get('/', (req, res) => {
    res.send('Welcome to Tech Projects!');
});

app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.status(200).send('OK');
    } catch (err) {
        res.status(500).send('Database connection error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});