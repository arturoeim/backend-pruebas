import bcrypt from "bcrypt";

const helpers = {};

helpers.encryptPassword = async(CONTRASENA) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(CONTRASENA, salt);
    return hash;
};

helpers.matchPassword = async(CONTRASENA, savedPassword) => {
    try {
        return await bcrypt.compare(CONTRASENA, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

export default helpers;