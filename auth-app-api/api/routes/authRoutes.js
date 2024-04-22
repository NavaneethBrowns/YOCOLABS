import express from 'express'
import {
    login,
    signup
} from '../controllers/auth.controller.js';
const authRoutes = express.Router();

authRoutes
    .post('/login',login)
    .post('/signup',signup);

export default authRoutes;