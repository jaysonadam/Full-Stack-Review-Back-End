const express = require('express');
const app = express();
const cors = require("cors");
const port = 2022;

const userRouter = require('./routers/users/index');

// Middleware dari express untuk membaca req.body --> app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// 1. app.use menerima function
// 2. function pada app.use akan dijalankan pada setiap req

app.use('/users', userRouter)

// GET
// app.get('/', (req, res) => {
//     res.send('Server is running')
// });
// Postman --> Server is running

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});