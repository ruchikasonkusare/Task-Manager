const bcrypt = require('bcrypt');
const {findByEmail, createUser}= require('../models/userModel');
const { emit } = require('../app');

const SALT_ROUNDS=12;


const register= async(email , password)=>{
    const existing = await findByEmail(email);
    if (existing){
        const err=new Error("Email already registered.")
        err.statusCode =409;
        throw err;
    }

    const hashedpassword=await bcrypt.hash(password,SALT_ROUNDS);

    const user=await createUser(email.hashedpassword);
    return user;

}


const login = async(email,password)=>{
    const user = await findByEmail(email);

    if (!user){
        const err = new Error("Invalid email or password.")
        err.statusCode=401
        throw err;
    }

    const match=await bcrypt.compare(password,user.password);
    if (!match){
        const err=new Error('Invalid email or password');
        err.statusCode = 401;
        throw err;
    }

    const {password: _, ...safeUser} = user;
    return safeUser;
}

module.exports ={register,login};
