let mysql = require('mysql')
let dotenv = require('dotenv')
let fs = require('fs')
const express = require('express')
const cors = require('cors')

dotenv.config()

let schema = fs.readFileSync('./schema.sql').toString()

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

connection.connect()



// 서버

express.json();

const app = express()

const port = 4000;

app.use(cors())

app.get('/', (req, res) => {
    const querySQL = `SELECT * FROM menu;`

    connection.query(querySQL, (err, rows, fiels) => {
        if (err) {
            res.status(404).send('Not found')
        } else {
            res.status(200).json(rows)
        }
    })
})

app.listen(port, () => {
    console.log(`hi, ${port}`)
})

// connection.end() 연결 종료
