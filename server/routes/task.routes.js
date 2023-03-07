import {Router} from 'express';
import {getTasks, getTask, deleteTask, createTask, updateTask, updateDoneTask} from '../controllers/tasks.controllers.js';
import {verifyUser, verifyAdmin} from '../lib/authuser.js';

const router = Router();

router.get('/tasks', verifyUser, getTasks);

router.get('/tasks/:id', verifyUser, getTask);

router.post('/tasks', verifyUser, createTask);

router.put('/tasks/:id', verifyUser, updateTask);

router.put('/tasks2/:id', verifyUser, updateDoneTask);

router.delete('/tasks/:id', verifyUser, deleteTask);



export default router;