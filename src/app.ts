import express from 'express';
import * as mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
console.log("User and Password " + process.env.MYSQL_USER, process.env.MYSQL_PASSWORD)

//connect to mysql database...
function createConnection() {
    return mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "gustavo",
        password: process.env.MYSQL_PASSWORD,
        database: "ticket",
    });
}

let connection = createConnection()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    const message = { "message": "Hello, World!" }
    res.json(message);
});

app.post('/partners', (req, res) => {
    const { name, email, password, comapny_name } = req.body
})

app.post("/customers", (req, res) => {
    const { name, email, password, adress, telefone } = req.body
})


app.post("/partners/events", (req, res) => {
    const { name, description, date, location } = req.body
    res.send('Event created successfully!');
})

app.get("/partners/events/:eventId", (req, res) => {
    const { eventId } = req.params
    console.log(eventId)
    res.send()
})


app.get("/partners/events", (req, res) => {
    res.send()
})

app.get("/events", (req, res) => {
    res.send()
})

app.get("/events/:eventId", (req, res) => {
    const { eventId } = req.params
    console.log(eventId)
    res.send()
})

app.post('/auth/login', (req, res) => {
    //destructuring...
    const { email, password } = req.body
    console.log(email, password)
    res.send('Login successful!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})