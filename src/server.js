import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';

const app = express();

app.use(cors())
app.use(express.json());

app.use(authRouter)

app.listen(8080)