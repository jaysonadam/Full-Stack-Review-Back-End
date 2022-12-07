const router = require("express").Router();
const pool = require("../../config/database/db");

// Homework ID
const getHomeworkById = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
        await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT homework_name FROM homework WHERE homework_name = '${req.query.homework_name}';`;
            const result = await connection.query(sql)
            connection.release();
        
            const hw = result[0]
            const hasil = hw[0]
        
            res.status(200).send({ hasil });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
  };

// Stream ID
const getHomeworkByStream = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = `SELECT h.homework_id, h.homework_name, h.homework_desc, h.due_date FROM homework h
            JOIN subjects s ON h.subject_id = s.subject_id
            WHERE s.stream_id = ${req.params.stream_id} ORDER BY h.due_date DESC;`;
        
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

// Get HW by Subject
const getHomeworkBySubject = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

      try {
          const connection = await pool.promise().getConnection();
      
          const sql = `SELECT h.homework_name, h.homework_desc, h.due_date FROM homework h
          JOIN subjects s ON h.subject_id = s.subject_id
          WHERE s.subject_id = ${req.params.subject_id} AND h.stream_id = ${req.params.stream_id} ORDER BY h.due_date DESC;`;
      
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

router.get('/', getHomeworkById);
router.get('/:stream_id', getHomeworkByStream);
router.get('/:stream_id/:subject_id', getHomeworkBySubject);

module.exports = router;