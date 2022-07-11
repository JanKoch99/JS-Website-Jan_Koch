const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection
const db = mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'JS-Website-Jan_Koch',
   port:3306
});

// check database connection
db.connect(err => {
    if (err) {
        console.log('database connection err: ' + err)
    } else {
        console.log('database connected ...')
    }
})

// get all data
app.get('/user',(req,res)=> {
    let qr = 'select * from user ';

    db.query(qr,(err,result)=> {
        if (err) {
            console.log(err,'get data error')
        }
        if (result.length>0) {
            res.send({
                message:'all user data',
                data:result
            })
        }
    })
});

app.listen(3000,() => {
    console.log('backend is running...')
});

// get single data
app.get('/user/:id', (req, res)=> {
    console.log('get single data')
    let gID = req.params.id;

    // let qr = 'select * from user where id = ?';
    let qr = `select * from user where id = ${gID}`
    console.log(qr)
    db.query(qr,(err,result)=> {
        if (err) {
            console.log(err,'get data error')
        }
        if (result.length>0) {
            res.send({
                message:'all user data',
                data:result
            })
        } else {
            res.send({
                message:'this user doesnt exist'
            })
        }
    })
})

// create data
app.post('/user', (req,res)=> {
    console.log('post data')

    let fullname = req.body.fullname
    let email = req.body.email
    let mobile = req.body.mobile

    let qr = `insert into user(fullname, email, mobile) values('${fullname}','${email}','${mobile}')`

    db.query(qr, (err, result)=> {
        if (err) {
            console.log(err)
        }
        res.send({
            message: 'data inserted',
            data: result
        })
    })
})

//update data
app.put('/user/:id', (req,res)=> {
    console.log('update data')

    let gID = req.params.id
    let fullname = req.body.fullname
    let email = req.body.email
    let mobile = req.body.mobile

    let qr = `update user set fullname = '${fullname}', email = '${email}', mobile = '${mobile}' where id = ${gID}`
    db.query(qr,(err,result)=> {
        if (err) {
            console.log(err)
        }
        res.send({
            message: 'data updated',
            data: result
        })
    })
})

// delete data
app.delete('/user/:id', (req, res)=> {
    console.log('delete data')
    let gID = req.params.id

    let qr = `delete from user where id = '${gID}'`
    db.query(qr,(err,result)=> {
        if (err) {
            console.log(err)
        }
        res.send({
            message: 'data deleted',
            data: result
        })
    })
})
