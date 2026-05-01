const pool=require('../config/db');

const findUserByEmail=async(email)=>{
    const result=await pool.query(`
    SELECT * FROM users WHERE email=$1;`
    [email]
    );
    return result.rows[0];
};

const findById=async(id)=>{
    const result=await pool.query(`
        SELECT id,email,role,created_at FROM users WHERE id=$1;`,
    [id]);
    return result.rows[0];
}

const createUser=async(email,hashedpassword,role='user')=>{
    const result=await pool.query(
        `INSERT INTO users (email,password,role)
        VALUES ($1,$2,$3)
        RETURNING id,email,role,created_at`,
        [email,hashedpassword,role]
    );

    return result.rows[0];
}

module.exports={
    findUserByEmail,
    findById,
    createUser

}