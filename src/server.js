import express from 'express'
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import userRouter from './routes/userRoutes.js';
import kiemDuyetRouter from './routes/kiemDuyetRoutes.js';
import blackListRouter from './routes/blackListRoutes.js';
import categoryRouter from './routes/categoryRoutes.js';
import favoriteRouter from './routes/favoriteRoutes.js';

const app = express();

app.use(cors())
app.use(express.json());

app.use(authRouter)
app.use(recipeRouter)
app.use(userRouter)
app.use(kiemDuyetRouter)
app.use(blackListRouter)
app.use(categoryRouter)
app.use(favoriteRouter)


app.listen(8080)