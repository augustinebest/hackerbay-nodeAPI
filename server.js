import express from 'express';

const app = express();

const PORT = 9000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on PORT:${PORT}`);
})