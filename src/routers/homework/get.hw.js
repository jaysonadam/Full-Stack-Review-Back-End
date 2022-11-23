const router = require("express").Router();
const pool = require("../../config/database/db");

// Stream ID
const getHomeworkBySteam = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT h.homework_name, h.homework_desc, h.due_date FROM homework h
            JOIN subjects s ON h.subject_id = s.subject_id
            WHERE s.stream_id = ${req.params.stream_id};`;
        
            const result = await connection.query(sql)
            connection.release();
        
            const hw = result[0]
        
            res.status(200).send({ hw });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get('/:stream_id', getHomeworkBySteam);

module.exports = router;