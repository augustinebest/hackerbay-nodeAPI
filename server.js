import app from './api/app';

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on PORT:${PORT}`);
})

export default app;