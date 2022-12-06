const router = require("express").Router();
const pool = require("../../config/database/db");

const postExamResults = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();

            const sql = `INSERT INTO grades SET ?;`;
            const data = [ req.body ]

            const result = await connection.query(sql, data)
            connection.release();
                     
            res.status(200).send("Successfully added");
          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.post('/', postExamResults);

module.exports = router;