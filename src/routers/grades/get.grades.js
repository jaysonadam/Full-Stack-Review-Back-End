const router = require("express").Router();
const pool = require("../../config/database/db");

const getGradesById = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT u.fullname, g.grades, e.exam_name FROM grades g
            JOIN exams e ON g.exam_id = e.exam_id
            JOIN users u ON g.student_id = u.user_id
            WHERE u.user_id = ${req.params.user_id};`;
        
            const result = await connection.query(sql)
            connection.release();
        
            const grades = result[0]
        
            res.status(200).send({ grades });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get('/:id', getGradesById)

module.exports = router;