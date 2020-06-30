const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gmdb_app',
  password: 'password',
  host: 'localhost',
  database: 'students',
  port: 5432
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// root route; just says hello
app.get('/', (req, res) => {
    res.send("'Hello World! This is the Home Page.<br /><br /><A HREF='/students'>Student List</a>");
});

//displays list of all students
app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
});

//search for specific student by id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
});

//search for any students matching query parameter ?search=
app.get('/student', (req, res) => {
    const searchString = req.query.search
    pool.query('SELECT * FROM students WHERE name like \'%' +searchString +'%\'', (error, results) => {
       if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
});

//add new grade to database
app.post('/grade', (req, res) => {
    const studentId = req.body.studentId
    const grade = req.body.grade

    pool.query('INSERT INTO grades (studentId, grade) VALUES ($1, $2)', [studentId, grade], (error, results) => {
        if (error) {
            throw error
           }
           res.status(201).send('Grade of: ' +grade +' added for studentID: ' +studentId)
    })
});


app.listen(port, () => {
    console.log(`Example app is listening on ${port}`);
})
