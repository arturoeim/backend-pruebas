import {pool} from '../db.js'

export const getTasks = async (req, res) => {
    try{
        const role = req.role;
        const userId = req.userId;
        if(role ==="ADMIN"){
            const [tareas] = await pool.query("SELECT * FROM tasks");
            res.json(tareas);
        }else{
            const [tareas] = await pool.query("SELECT * FROM tasks WHERE USER_ID =?",[userId]);
            res.json(tareas);
        }
        
    }catch (e){
        return res.status(500).json({message: e.message});
    };
};

export const getTask = async (req, res) => {
    try{
        const [tarea] = await pool.query("SELECT * FROM tasks WHERE ID ='"+req.params.id+"'");
        if(tarea.length === 0){
            return res.status(404).json({message: "Task not found"});
        };
        res.json(tarea[0]);
    }catch (e){
        return res.status(500).json({message: e.message});
    };
};

export const createTask = async (req, res) => {
    try{
        const {title, description} = req.body
        const newTaks = {
            TITLE: title,
            DESCRIPCION: description,
            DONE: 0,
            USER_ID: req.userId
        };

        const [result] = await pool.query("INSERT INTO tasks set ?", [newTaks]);
        res.json({
            id: result.insertId,
            title,
            description
        });
    }catch (e){
        return res.status(500).json({message: e.message});
    };
    
};

export const updateTask = async (req, res) => {
    try{
        const {title, description} = req.body
        const newTaks = {
            TITLE: title,
            DESCRIPCION: description
        };
        const [result] = await pool.query("UPDATE tasks SET ? WHERE ID = ?", [newTaks, req.params.id]);

        if(result.affectedRows === 1){
            return res.sendStatus(204);
        }else{
            return res.status(404).json({message: "Task not found"});
        };
    }catch (e){
        return res.status(500).json({message: e.message});
    };

};

export const updateDoneTask = async (req, res) => {
    try{
        const {done} = req.body
        const newTaks = {
            DONE: done
        };

        //Si quiero especificar los datos a actualizar
        const [result] = await pool.query("UPDATE tasks SET ? WHERE ID = ?", [newTaks, req.params.id]);

        if(result.affectedRows === 1){
            return res.sendStatus(204);
        }else{
            return res.status(404).json({message: "Task not found"});
        };
    }catch (e){
        return res.status(500).json({message: e.message});
    };

};

export const deleteTask = async (req, res) => {
    try{
        const [result]= await pool.query("DELETE FROM tasks WHERE ID ='"+req.params.id+"'");

        if(result.affectedRows === 1){
            return res.sendStatus(204);
        }else{
            return res.status(404).json({message: "Task not found"});
        }
    }catch (e){
        return res.status(500).json({message: e.message});
    };
   
};