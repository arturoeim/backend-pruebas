import {Router} from 'express';
import {getUsers, getUser, createUser, updateUser, deleteUser} from '../controllers/users.controllers.js';
import {verifyUser, verifyAdmin} from '../lib/authuser.js';

const router = Router();

router.get('/users',verifyUser, verifyAdmin, getUsers);

router.get('/users/:id',verifyUser, verifyAdmin, getUser);

router.post('/users',verifyUser, verifyAdmin, createUser);

router.put('/users/:id',verifyUser, verifyAdmin, updateUser);

router.delete('/users/:id',verifyUser, verifyAdmin, deleteUser);



export default router;