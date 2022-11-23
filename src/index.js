const express = require('express');
const app = express();
const cors = require("cors");
const port = 2022;

const userRouter = require('./routers/users/index');
const gradesRouter = require('./routers/grades/index');
const productRouter = require('./routers/products/index');
const categoryRouter = require('./routers/category/index');

// Middleware dari express untuk membaca req.body --> app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// 1. app.use menerima function
// 2. function pada app.use akan dijalankan pada setiap req

app.use('/users', userRouter)
app.use('/grades', gradesRouter)
app.use('/products', productRouter)
app.use('/category', categoryRouter)

// GET
// app.get('/', (req, res) => {
//     res.send('Server is running')
// });
// Postman --> Server is running

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});