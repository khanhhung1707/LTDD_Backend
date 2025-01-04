import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(cors())
app.use(express.json());

app.use(authRouter)
app.use(recipeRouter)
app.use(userRouter)


app.listen(8080)