const router = require("express").Router();
const pool = require("../../config/database/db");

const getAllProducts = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    	await connection.beginTransaction();

        try {
            const connection = await pool.promise().getConnection();
        
            const sql = 'SELECT c.category_id, c.category_name, p.product_id, p.product_name, p.stock, p.description, p.price FROM products p JOIN category c ON c.category_id = p.category_id;';
        
            const result = await connection.query(sql)
            connection.release();
        
            const products = result[0]
        
            res.status(200).send({ products });

          } catch (error) {
            next(error)
          }
    } catch (error) {
      next (error)
    };
};

router.get("/all", getAllProducts);

module.exports = router;