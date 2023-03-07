import express  from "express";
import cors from 'cors'
import {PORT, databaseStore} from './config.js';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import path from 'path';
import dotenv from 'dotenv';
import session from "express-session";
import MySQLStore from 'express-mysql-session';


import taskRoutes from './routes/task.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

var sessionStore = new MySQLStore(databaseStore);

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{
        secure: 'auto'
    }    
}));

app.use(express.json());
app.use(cors({
    credentials: true
}));

//Routes

app.use(userRoutes);
app.use(taskRoutes);
app.use(authRoutes);

//Public

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT)
console.log(`Server is running on port ${PORT}` );
