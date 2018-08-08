import express from 'express';

import authRoutes from './Auth';


const router = express();

const config = {}


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: MIDDLEWARES

//TODO Middle Wares Will Be Added Here

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: AUTH ROUTE
router.use('/auth', authRoutes({config}));


export default router;