const express = require('express');
const app = express();
const cors = require("cors");
const port = 2022;
// const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const examRouter = require('./routers/exam/index');
const userRouter = require('./routers/users/index');
const gradesRouter = require('./routers/grades/index');
const submitRouter = require('./routers/submit-hw/index');
const productRouter = require('./routers/products/index');
const subjectsRouter = require('./routers/subjects/index');
const categoryRouter = require('./routers/category/index');
const homeworkRouter = require('./routers/homework/index');

// Middleware dari express untuk membaca req.body --> app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// 1. app.use menerima function
// 2. function pada app.use akan dijalankan pada setiap req

// app.use(bodyParser.json());
// app.use(forms.array()); 
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(upload.array()); 

// // for parsing application/json
// app.use(express.json()); 

// // for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); 

app.post('/submit', upload.array(), submitRouter);

app.use('/exam', examRouter)
app.use('/users', userRouter)
app.use('/grades', gradesRouter)
app.use('/submit', submitRouter)
app.use('/products', productRouter)
app.use('/subjects', subjectsRouter)
app.use('/category', categoryRouter)
app.use('/homework', homeworkRouter)

// GET
// app.get('/', (req, res) => {
//     res.send('Server is running')
// });
// Postman --> Server is running

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});