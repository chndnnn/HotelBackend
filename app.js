import express from 'express';
import roomrouter from './Routers/roomRouter.js';
import userRouter from './Routers/userRouter.js';
import bookingrouter from './Routers/bookingRouter.js';
import cors from 'cors'

let app = express();

app.use(express.json());
app.use(cors());
app.use('/hotel/v1',roomrouter,userRouter,bookingrouter)
// app.use('/hotel/v1',)
// app.use('/hotel/v1',)

export default app;