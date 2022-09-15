const router = require("express").Router();
const pool = require("../../config/database/db");

// POST LOGIN
const postLoginUser = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
            const {username, password} = req.body
        
            const sqlLoginUser = 'SELECT id, username, name FROM users WHERE username = ?;';
            const sqlDataUser = username;
        
            const result = await connection.query(sqlLoginUser, sqlDataUser)
            connection.release();
        
            const user = result[0]
        
            res.status(200).send({ user });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.post("/login", postLoginUser);

module.exports = router;