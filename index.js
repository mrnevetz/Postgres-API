const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


const students = [
    { id: 1, name: 'Steve Peterson' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Doe' },
    { id: 4, name: 'Donald Trump' },
    { id: 5, name: 'George Washington' }
];

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
    res.send(students);
});

app.get('/students/:id', (req, res) => {
    id = req.params.id;
    res.send("<b>Student Details</b><br />Id: "+id +"<br />Name: "+students[id]);
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
