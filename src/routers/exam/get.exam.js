const router = require("express").Router();
const pool = require("../../config/database/db");

const getExamId = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT e.exam_id, e.exam_name FROM exams e
            JOIN streams s ON e.stream_id = s.stream_id 
            WHERE s.stream_id = ${req.params.stream_id};`;
                         
            const result = await connection.query(sql)
            connection.release();
        
            const exams = result[0]
        
            res.status(200).send({ exams });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get('/:stream_id', getExamId);

module.exports = router;