import {pool} from '../db.js';
import helpers from '../lib/helpers.js';

export const Login = async (req, res) => {
    try{
        const {cedula, contrasena} = req.body;
        const [tarea] = await pool.query("SELECT * FROM USUARIOS_WEB WHERE CEDULA = ?",[cedula]);

        if(tarea.length > 0){
            const user = tarea[0];
            const validPassword = await helpers.matchPassword(contrasena, user.CONTRASENA);

            if (validPassword) {
                req.session.userId = user.ID;
                return res.status(200).json(user);
            } else {
                return res.status(400).json({msg:"Contraseña incorrecta"});
            };
        }else{
            return res.status(404).json({msg:"Usario no existe"});
            
        }
        
    }catch (e){
        return res.status(500).json(["Error en la base/servidor"]);
    };
};

export const Me = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg :"Porfavor inicie sesión en su cuenta"});
    }
    try{
        const id = req.session.userId;
        const [data] = await pool.query("SELECT * FROM USUARIOS_WEB WHERE ID = ?",[id]);

        if(data.length > 0){
            const user = data[0];
            return res.status(200).json(user);

            
        }else{
            return res.status(404).json({msg:"Usario no encontrado"});
            
        }
        
    }catch (e){
        return res.status(500).json(["Error en la base/servidor"]);
    };
};


export const Logout = async (req, res) => {
        
    req.session.destroy((err)=>{
        if(err){
            return res.status(400).json({msg:"No puedo cerrar sesión"});
        }else{
            return res.status(200).json({msg:"Sesión cerrada correctamente"});
        }
    });
    
};