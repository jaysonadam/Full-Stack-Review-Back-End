const router = require("express").Router();
const pool = require("../../config/database/db");

// PUT USER DETAILS
const putUserDetails = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sqlEdit = `UPDATE users SET ? WHERE id = ${req.params.id};`;
            const dataEdit = [ req.body ];
        
            const result = await connection.query(sqlEdit, dataEdit)
            connection.release();
        
            res.status(200).send('Update was successful');

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.put("/edit/:id", putUserDetails);

module.exports = router;