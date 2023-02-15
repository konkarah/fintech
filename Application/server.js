const express = require('express')
const app = express()
const port = 3005
const pool = require('../Database/mysql')
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')

//middleware
app.use(express.static(__dirname + '/public'));
app.use(cors())
app.use(bodyParser.json())
//ejs
/*app.use(expressLayouts)
app.set('view engine', 'ejs')*/

//app.set('views', path.join(__dirname, 'views'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended : true}));

app.get('/', (req,res)=> {
    res.send("Welcome to kilimo high school website")
})


//register class
app.post('/classregister', (req,res)=> {
    const classname = req.body.classname
    const studentnp = req.body.studentno

    pool.query(
        "INSERT INTO class(class_name, stu_no) VALUES (?,?)",
        [classname,studentnp],
        (err,results) => {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                console.log(results)
                res.send('Successfully registered the stream/class')
            }
        }
    )
})

//classregister interface
app.get('/classreg', (req,res)=> {
    res.render('classregister')
})

//get all classes
app.get('/getallclasses', (req,res)=> {
    pool.query(
        "SELECT * FROM class",
        (err,result)=> {
            if(err){
                res.send(err)
            }else{
                res.send(result)
            }
        }
    )
})

//get all classes int
app.get('/classint', (req,res)=> {
    res.render('getallclasses')
})


//capture students data
app.post('/capturestudentdata', (req,res)=> {
    const reg = req.body.regno
    const stuname = req.body.stuname
    const phone = req.body.phoneno
    const classname = req.body.class

    pool.query(
        "INSERT INTO students(reg_no,student_name,phone_no,class) VALUES (?,?,?,?)",
        [reg,stuname,phone,classname],
        (err,result)=> {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                console.log(result)
                res.send("successfully registered student")
            }
        }
    )

})

//capture student data int
app.get('/captstu', (req,res)=> {
    res.render('capturestudentdata')
})

//view single class
app.get('/viewclassstream', (req,res)=> {
    const classname = req.body.classname

    pool.query(
        "SELECT * FROM class where classname = ? ",
        classname, 
        (err,result)=> {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                res.send(result)
            }
        }
    )
})

//edit student data
app.post('/editstudentdata', (req,res)=> {
    const classname = req.body.class
    const regno = req.body.regno

    pool.query(
        "UPDATE students set class = ? where reg_no = ?",    
        [classname,regno], 
        (err,result)=> {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                console.log(result)
                res.send("successfully updated students details")
            }
        }
    )
})

//edit student 
app.get('/editstuint', (req,res)=> {
    res.render('editstudentdata')
})

//delete student data
app.post('/deletestu', (req,res)=> {
    const reg = req.body.regno

    pool.query(
        "DELETE FROM students WHERE reg_no = ?",
        reg,
        (err,result)=> {
            if(err){
                console.log(err),
                res.send(err)
            }else{
                console.log(result),
                res.send("successfully deleted student")
            }
        }
    )
})
//delete stu int
app.get('/deletestu', (req,res)=> {
    res.render('deletestudent')
})

//view single students data
app.post('/viewstu', (req,res)=> {
    const regno = req.body.regno

    pool.query(
        "SELECT  * FROM students  WHERE reg_no = ?",
        regno,
        (err,result)=> {
            if(err){
                console.log(err)
                res.send(err)
            }else{
                res.send(result)
            }
        }
    )
})

app.get('/viewstuint', (req,res)=> {
    res.render('viewstu')
})

//get all students
app.get('/getallstu', (req,res)=> {
    pool.query(
        "SELECT * FROM students",
        (err,results)=> {
            if(err){
                console.log(err)
            }else{
                res.json(results)
            }
        }
    )
})

//view students that belong to a particular stream
app.get('/getallstuinstream', (req,res)=> {
    const classname = req.body.classname
    pool.query(
        "SELECT * FROM students where class = ?",
        classname,
        (err,results)=> {
            if(err){
                console.log(err)
            }else{
                res.send(results)
            }
        }
    )
})

app.get('/getallstream',(req,res)=> {
    res.render('getallstustream')
})
   
app.listen(port, ()=>{
    console.log(`Server listening on ${port}`)
})