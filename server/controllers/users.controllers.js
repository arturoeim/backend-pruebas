import {pool} from '../db.js';
import helpers from '../lib/helpers.js';

export const getUsers = async (req, res) => {
    try{
        const [tareas] = await pool.query("SELECT * FROM USUARIOS_WEB");
        res.status(200).json(tareas);
    }catch (e){
        return res.status(500).json({message: e.message});
    };
};

export const getUser = async (req, res) => {
    try{
        const [tarea] = await pool.query("SELECT * FROM USUARIOS_WEB WHERE ID ='"+req.params.id+"'");
        if(tarea.length === 0){
            return res.status(404).json({message: "User not found"});
        };
        res.status(200).json(tarea[0]);
    }catch (e){
        return res.status(500).json({message: e.message});
    };
};

export const createUser = async (req, res) => {
    try{
        const {cedula, nombre1, nombre2, apellido1, apellido2, correo, contrasena, tipo} = req.body
        const newUser = {
            CEDULA: cedula,
            NOMBRE1: nombre1,
            NOMBRE2: nombre2,
            APELLIDO1: apellido1,
            APELLIDO2: apellido2, 
            CORREO: correo,
            CONTRASENA: contrasena,
            TIPO: tipo
        };

        newUser.CONTRASENA = await helpers.encryptPassword(contrasena);
        console.log(newUser);

        const [result] = await pool.query("INSERT INTO USUARIOS_WEB SET ?", [newUser]);
        res.json({
            ID: result.insertId,
            CEDULA: cedula,
            NOMBRE: nombre1+" "+apellido1,
            CONTRASENA: contrasena
        });
    }catch (e){
        return res.status(500).json({message: e.message});
    };
    
};

export const updateUser = async (req, res) => {
    try{
        const {cedula, nombre1, nombre2, apellido1, apellido2, correo, contrasena, tipo} = req.body
        const newUser = {
            CEDULA: cedula,
            NOMBRE1: nombre1,
            NOMBRE2: nombre2,
            APELLIDO1: apellido1,
            APELLIDO2: apellido2, 
            CORREO: correo,
            CONTRASENA: contrasena,
            TIPO: tipo
        };

        newUser.CONTRASENA = await helpers.encryptPassword(contrasena);


        const [result] = await pool.query("UPDATE USUARIOS_WEB SET ? WHERE ID = ?", [newUser, req.params.id]);

        if(result.affectedRows === 1){
            return res.sendStatus(204);
        }else{
            return res.status(404).json({message: "User not found"});
        };
    }catch (e){
        return res.status(500).json({message: e.message});
    };

};

export const deleteUser = async (req, res) => {
    try{
        const [result]= await pool.query("DELETE FROM USUARIOS_WEB WHERE ID ='"+req.params.id+"'");

        if(result.affectedRows === 1){
            return res.sendStatus(204);
        }else{
            return res.status(404).json({message: "User not found"});
        }
    }catch (e){
        return res.status(500).json({message: e.message});
    };
   
};