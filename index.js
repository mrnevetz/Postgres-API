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

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

var grades = [
    { id: 1, grade: 'A' },
    { id: 2, grade: 'A' },
    { id: 3, grade: 'B' },
    { id: 4, grade: 'C' }
]

app.get('/', (req, res) => {
    res.send("'Hello World! This is the Home Page.<br /><br /><A HREF='/students'>Student List</a>");
});

app.get('/students', (req, res) => {
    pool.query('SELECT * FROM students', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
      })
});


app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
});


app.get('/student', (req, res) => {
    const searchString = req.query.search
    pool.query('SELECT * FROM students WHERE name like \'%' +searchString +'%\'', (error, results) => {
       if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
});


app.get('/grades/:id', (req, res) => {
    const idGrades = grades.find(x => x.id === parseInt(req.params.id));
    if (!idGrades) res.status(400).send('No grades found for this student');
    res.send(idGrades);
});

app.post('/grades', (req, res) => {
    app.use(bodyParser.json());
    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Example app is listening on ${port}`);
})
