const router = require("express").Router();
const pool = require("../../config/database/db");

const getCategory = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = 'SELECT category_id, category_name FROM category;';
        
            const result = await connection.query(sql)
            connection.release();
        
            const categories = result[0]
        
            res.status(200).send({ categories });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get("/get", getCategory);

module.exports = router;