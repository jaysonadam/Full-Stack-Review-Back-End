const router = require("express").Router();
const pool = require("../../config/database/db");

const getAllSubjects = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT * FROM subjects WHERE stream_id = ${req.params.stream_id}`;
        
            const result = await connection.query(sql)
            connection.release();
        
            const subjects = result[0]
        
            res.status(200).send({ subjects });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get('/:stream_id', getAllSubjects)

module.exports = router;