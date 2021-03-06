import 'dotenv/config';
import express from 'express';
import bodyparser from 'body-parser';

const app = express();

// Require routes
import authRoutes from './routes/authorization';

// Using middlewares
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.json({message: 'API up and running...'})
})

// Using routes
app.use('/api', authRoutes);
export default app;