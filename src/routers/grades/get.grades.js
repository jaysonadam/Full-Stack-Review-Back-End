const router = require("express").Router();
const pool = require("../../config/database/db");

const getGradesByStudentId = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT u.fullname, g.grades, e.exam_name, e.exam_date FROM grades g
            JOIN exams e ON g.exam_id = e.exam_id
            JOIN users u ON g.user_id = u.user_id
            WHERE u.user_id = ${req.params.id} ORDER BY exam_date DESC;`;
        
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

const getAllGrades = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT u.fullname, g.grades, e.exam_id, e.exam_name FROM grades g
                         JOIN exams e ON g.exam_id = e.exam_id
                         JOIN users u ON g.user_id = u.user_id
                         WHERE u.stream_id = ${req.params.stream_id} ORDER BY exam_date DESC;`;
        
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

const getFilteredGrades = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();
      
          const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                       JOIN exams e ON g.exam_id = e.exam_id
                       JOIN users u ON g.user_id = u.user_id
                       WHERE u.stream_id = ${req.params.stream_id} AND e.subject_id = ${req.params.subject_id} ORDER BY exam_date DESC;`;
      
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

router.get('/:id', getGradesByStudentId)
router.get('/:stream_id', getAllGrades)
router.get('/:stream_id/:subject_id', getFilteredGrades)

module.exports = router;