import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const message = { "message": "Hello, World!" }
    res.json(message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})