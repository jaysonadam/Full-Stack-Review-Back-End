const router = require("express").Router();
const pool = require("../../config/database/db");

// POST LOGIN
const postLoginTeacher = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
            const { username } = req.body
        
            const sqlLoginUser = 'SELECT teacher_id, username, role, fullname, class FROM teachers WHERE username = ?;';
            const dataLoginUser = username;
        
            const result = await connection.query(sqlLoginUser, dataLoginUser)
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

router.post("/login", postLoginTeacher);

module.exports = router;