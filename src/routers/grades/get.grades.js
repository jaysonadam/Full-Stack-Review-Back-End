const router = require("express").Router();
const pool = require("../../config/database/db");

const getGrades = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();

            const { exam_id: exam_id_param, user_id: user_id_param, subject_id: subject_id_param, stream_id: stream_id_param } = req.query;

            let filter;

            if (exam_id_param && user_id_param) {
                filter = `WHERE e.exam_id = '${exam_id_param}' AND u.user_id = '${user_id_param}'`
            } else if (subject_id_param && user_id_param) {
                filter = `WHERE e.subject_id = '${subject_id_param}' AND u.user_id = '${user_id_param}' ORDER BY exam_date DESC`
            } else if (exam_id_param) {
                filter = `WHERE e.exam_id = '${exam_id_param}' ORDER BY g.grades DESC`
            } else if (subject_id_param) {
                filter = `WHERE e.subject_id = '${subject_id_param}' ORDER BY exam_date DESC`
            } else if (user_id_param) {
                filter = `WHERE u.user_id = '${user_id_param}' ORDER BY g.grades DESC`
            } else if (stream_id_param) {
                filter = `WHERE s.stream_id = '${stream_id_param}' ORDER BY exam_date DESC`
            };
        
            const sqlCount = `SELECT COUNT(*) AS count FROM grades g
                              JOIN exams e ON g.exam_id = e.exam_id
                              JOIN users u ON g.user_id = u.user_id
                              JOIN streams s ON u.stream_id = s.stream_id
                              ${filter};`;

            const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                         JOIN exams e ON g.exam_id = e.exam_id
                         JOIN users u ON g.user_id = u.user_id
                         JOIN streams s ON u.stream_id = s.stream_id
                         ${filter};`;
                         
            const [result] = await connection.query(sql)
            const [count] = await connection.query(sqlCount)
            connection.release();
        
            res.status(200).send({ result, count });

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
        
            const sqlCount = `SELECT COUNT(*) AS count FROM grades g
                              JOIN exams e ON g.exam_id = e.exam_id
                              WHERE e.stream_id = ${req.params.stream_id};`;

            const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                         JOIN exams e ON g.exam_id = e.exam_id
                         JOIN users u ON g.user_id = u.user_id
                         JOIN streams s ON u.stream_id = s.stream_id
                         WHERE s.stream_id = ${req.params.stream_id} ORDER BY exam_date DESC;`;

            const [result] = await connection.query(sql)
            const [count] = await connection.query(sqlCount)
            connection.release();
                     
            res.status(200).send({ result, count });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

const getStudentGrades = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
      await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();
      
          const sqlCount = `SELECT COUNT(*) AS count FROM grades g
                            JOIN exams e ON g.exam_id = e.exam_id
                            WHERE e.stream_id = ${req.params.stream_id} AND gj.user_id = ${req.params.user_id};`;

          const sql = `SELECT u.fullname, g.grades, e.exam_date, e.exam_name FROM grades g
                       JOIN exams e ON g.exam_id = e.exam_id
                       JOIN users u ON g.user_id = u.user_id
                       JOIN streams s ON u.stream_id = s.stream_id
                       WHERE s.stream_id = ${req.params.stream_id} AND u.user_id = ${req.params.user_id} ORDER BY exam_date DESC;`;

          const [result] = await connection.query(sql)
          const [count] = await connection.query(sqlCount)
          connection.release();
                   
          res.status(200).send({ result, count });

        } catch (error) {
          next(error)
        }
  } catch (error) {
    next (error)
  };
};

router.get('/', getGrades)
router.get('/:stream_id', getAllGrades)
router.get('/:stream_id/:user_id', getStudentGrades)

module.exports = router;