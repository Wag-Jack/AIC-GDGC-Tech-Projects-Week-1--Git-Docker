import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Tech Projects!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});