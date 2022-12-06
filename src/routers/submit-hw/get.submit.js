const router = require("express").Router();
const pool = require("../../config/database/db");

const getSubmittedHw = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();

            const { homework_id: homework_id_param, user_id: user_id_param, stream_id: stream_id_param } = req.query;

            let filter;

            if (homework_id_param && user_id_param) {
                filter = `WHERE h.homework_id = '${homework_id_param}' AND u.user_id = '${user_id_param}'`
            } else if (homework_id_param) {
                filter = `WHERE h.homework_id = '${homework_id_param}' ORDER BY h.created_at DESC`
            } else if (user_id_param) {
                filter = `WHERE u.user_id = '${user_id_param}' ORDER BY h.created_at DESC`
            } else if (stream_id_param) {
                filter = `WHERE h.stream_id = '${stream_id_param}' ORDER BY h.created_at DESC`
            };
        
            const sqlCount = `SELECT COUNT(*) AS count FROM submit s
                              JOIN homework h ON s.homework_id = h.homework_id
                              JOIN users u ON s.user_id = u.user_id
                              ${filter};`;

            const sql = `SELECT s.homework_id, h.homework_name, u.user_id, u.fullname, s.created_at, filename FROM  submit s
                        JOIN homework h ON s.homework_id = h.homework_id
                        JOIN users u ON s.user_id = u.user_id
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

router.get('/', getSubmittedHw)
// router.get('/:stream_id', getAllSubmittedHw)

module.exports = router;