import {pool} from '../db.js';

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg :"Porfavor inicie sesión en su cuenta"});
    }
    try{
        const id = req.session.userId;
        const [data] = await pool.query("SELECT * FROM USUARIOS_WEB WHERE ID = ?",[id]);

        if(data.length > 0){
            const user = data[0];
            req.userId = user.ID;
            req.role = user.TIPO;
            next();

            
        }else{
            return res.status(404).json({msg:"Usario no encontrado"});
            
        }
        
    }catch (e){
        return res.status(500).json(["Error en la base/servidor"]);
    };
};


export const verifyAdmin = async (req, res, next) => {
    try{
        const id = req.session.userId;
        const [data] = await pool.query("SELECT * FROM USUARIOS_WEB WHERE ID = ?",[id]);

        if(data.length > 0){
            const user = data[0];
            if(user.TIPO==="ADMIN"){
                next();
            }else{
                return res.status(404).json({msg:"Usuario no tiene permisos"})
            }        
        }else{
            return res.status(404).json({msg:"Usario no encontrado"});
            
        }
        
    }catch (e){
        return res.status(500).json(["Error en la base/servidor"]);
    };
};
