/*
 File made to define routes and middleware for the application.
 This file is the entry point for the application and is responsible for setting up the server and defining the routes.
*/
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
console.log("User and Password " + process.env.MYSQL_USER, process.env.MYSQL_PASSWORD)

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