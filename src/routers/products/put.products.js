const router = require("express").Router();
const pool = require("../../config/database/db");

// PUT PRODUCT DETAILS
const putProductDetails = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	  await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sqlEdit = `UPDATE products SET ? WHERE product_id = ${req.params.product_id};`;
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

router.put("/edit/:product_id", putProductDetails);

module.exports = router;