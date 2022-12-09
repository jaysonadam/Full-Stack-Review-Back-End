const router = require("express").Router();
const pool = require("../../config/database/db");

const postSubmit = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();

            const sql = `INSERT INTO submit SET ?;`;
            const data = [req.body];

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

router.post('/', postSubmit);

module.exports = router;