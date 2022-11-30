const router = require("express").Router();
const pool = require("../../config/database/db");

const getGradesByStudentId = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sqlCount = `SELECT COUNT(*) AS count FROM grades g
                              JOIN exams e ON g.exam_id = e.exam_id
                              JOIN subjects s ON e.subject_id = s.subject_id
                              WHERE g.user_id = ${req.params.user_id};`;

            const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                         JOIN exams e ON g.exam_id = e.exam_id
                         JOIN users u ON g.user_id = u.user_id
                         WHERE u.user_id = ${req.params.user_id} ORDER BY g.grades DESC;`;

            const filter = req.query.subject_id ? `WHERE s.subject_id = "${req.query.subject_id}"` : "";
                         
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

const getStreamGrades = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sqlCount = `SELECT COUNT(*) AS count FROM grades g
                              JOIN exams e ON g.exam_id = e.exam_id
                              WHERE e.stream_id = ${req.params.stream_id};`;

            const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                         JOIN exams e ON g.exam_id = e.exam_id
                         JOIN users u ON g.user_id = u.user_id
                         JOIN streams s ON u.stream_id = s.stream_id
                         WHERE s.stream_id = ${req.params.stream_id} ORDER BY exam_date DESC;`;

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

const getGradesByExamId = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();
      
          const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                       JOIN exams e ON g.exam_id = e.exam_id
                       JOIN users u ON g.user_id = u.user_id
                       JOIN streams s ON u.stream_id = s.stream_id
                       WHERE e.exam_id = ${req.params.exam_id} ORDER BY g.grades DESC;`;

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

const getSubjectGrades = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();
      
          const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                       JOIN exams e ON g.exam_id = e.exam_id
                       JOIN users u ON g.user_id = u.user_id
                       JOIN subjects s ON e.subject_id = s.subject_id
                       WHERE e.subject_id = ${req.params.subject_id} ORDER BY exam_date DESC;`;
                       
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

const getFilteredStudentGrades = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();
      
          const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                       JOIN exams e ON g.exam_id = e.exam_id
                       JOIN users u ON g.user_id = u.user_id
                       JOIN subjects s ON e.subject_id = s.subject_id
                       WHERE e.subject_id = ${req.params.subject_id} AND u.user_id = ${req.params.user_id} ORDER BY g.grades DESC;`;

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

router.get('/:user_id', getGradesByStudentId)
router.get('/exam/:exam_id', getGradesByExamId)
router.get('/stream/:stream_id', getStreamGrades)
router.get('/subject/:subject_id', getSubjectGrades)
router.get('/:subject_id/:user_id', getFilteredStudentGrades)

module.exports = router;