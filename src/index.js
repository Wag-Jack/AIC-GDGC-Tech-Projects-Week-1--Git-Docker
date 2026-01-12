const express = require('express');

const app = express();
const db = "imagine a database here";

app.get('/', (req, res) => {
    res.send('Welcome to Tech Projects!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});