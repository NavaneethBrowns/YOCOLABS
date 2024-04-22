import {config} from 'dotenv';
config();
const PORT = process.env.PORT || 3000;

import cors from 'cors';
import express, { json } from 'express'
import { dbConnect } from './config/dbConnection.js';
import itemRoutes from './api/routes/itemRoutes.js';
import authRoutes from './api/routes/authRoutes.js';

dbConnect();

const app = express();

app.use(cors());
app.use(json());

app.use('/', authRoutes);
app.use('/', itemRoutes);

app.listen(PORT,()=>{
    try {
        console.log(`App Running on ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})
