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

const getStudentsByStream = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();

          const sqlCount = `SELECT COUNT(*) AS count FROM users WHERE stream_id = ${req.params.stream_id} AND role = 'student';`;
          const sqlUserId = `SELECT user_id, fullname FROM users WHERE stream_id = ${req.params.stream_id} AND role = 'student';`;
      
          const [users] = await connection.query(sqlUserId)
            const [count] = await connection.query(sqlCount)
          connection.release();
      
          res.status(200).send({ users, count });

        } catch (error) {
          next(error)
        }
  } catch (error) {
    next (error)
  };
};

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.get("/all/:stream_id", getStudentsByStream);

module.exports = router;