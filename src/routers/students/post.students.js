const router = require("express").Router();
const pool = require("../../config/database/db");

// POST LOGIN
const postLoginUser = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
            const { username } = req.body
        
            const sqlLoginUser = 'SELECT student_id, username, role, fullname, class FROM students WHERE username = ?;';
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

// POST REGISTER
const postRegisterUser = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
      await connection.beginTransaction();

      try {
        const connection = await pool.promise().getConnection();

        const sqlRegister = 'INSERT INTO users SET ?;';
        const dataRegister = [
          {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }
        ];

        const result = await connection.query(sqlRegister, dataRegister)
        connection.release();

        res.status(200).send( 'Account successfully created' );
      } catch (error) {
        next(error)
      } 
    } catch (error) {
      next (error)
    }
};

router.post("/reg", postRegisterUser);
router.post("/login", postLoginUser);

module.exports = router;