const router = require("express").Router();
const pool = require("../../config/database/db");

const getAllUsers = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = 'SELECT * FROM users;';
        
            const result = await connection.query(sql)
            connection.release();
        
            const users = result[0]
        
            res.status(200).send({ users });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

const getUserById = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sqlUserId = 'SELECT user_id, username, fullname, email, password, role FROM users WHERE user_id = ?;';
            const dataUserId = req.params.user_id;
        
            const result = await connection.query(sqlUserId, dataUserId)
            connection.release();
        
            const users = result[0]
        
            res.status(200).send({ users });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get("/all", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;