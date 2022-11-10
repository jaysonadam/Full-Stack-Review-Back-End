const router = require("express").Router();
const pool = require("../../config/database/db");

// POST NEW PRODUCT
const postNewProduct = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
      await connection.beginTransaction();

      try {
        const connection = await pool.promise().getConnection();

        const sqlNew = 'INSERT INTO products SET ?;';
        const dataNew = [
          {
            product_name: req.body.product_name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            category_id: req.body.category_id
          }
        ];

        const result = await connection.query(sqlNew, dataNew)
        connection.release();

        res.status(200).send( 'Product successfully added' );
      } catch (error) {
        next(error)
      } 
    } catch (error) {
      next (error)
    }
};

router.post("/new", postNewProduct);

module.exports = router;