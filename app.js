const express = require('express');
let http = require('http');
let app = express();
let path = require("path");
let PORT = process.env.PORT || 3100;
let ejs = require('ejs');
const axios = require("axios");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const { createUser } = require('./src/middlewares/create_user');
const { response } = require('express');




const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3100',
    clientID: 'kUGwr6eaUlBs4kdB52fLWNhST4gnlNhp',
    issuerBaseURL: 'https://ticket-booth.us.auth0.com'
  };



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// public 
app.use(express.static('public'));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


app.get('/', async (req, res) => {
    const result = await axios("http://localhost:3000/all_events");
    const data = result.data;
    res.render('pages/index', { events: data.all_events});
});
app.get('/buy_ticket', (req, res) => {
    res.render('pages/buy_ticket');
});
app.get('/ticket', (req, res) => {
    res.render('pages/ticket');
});
app.get('/event_form', requiresAuth(), (req, res) => {
    res.render('pages/event_form');
});
app.get('/dashboard', [requiresAuth(), createUser] , (req, res) => {
    // console.log(JSON.stringify(req.oidc.user))
    res.render('pages/dashboard');
});
app.post('/events', async (req, res) => {
    try {
        let events_data = req.body;
        console.log("This is host data: ", events_data);
        const data = await axios.post('http://localhost:3000/events', events_data);
        res.redirect('/');
        // console.log({ data });

    } catch (error) {
        console.log("Error: ", error.message)
    }

});
app.post('/participants', async (req, res) => {
    try {
        let events_data = req.body;
        console.log("This is host data: ", events_data);
        const data = await axios.post('http://localhost:3000/events', events_data);

        console.log({ Data : data });

    } catch (error) {
        console.log("Error: ", error.message)
    }

});
app.get('/event/:id', async (req, res) => {
    let event_id_query = req.params.id;
    console.log("Event query", event_id_query)
    const result = await axios(`http://localhost:3000/event/${event_id_query}`);
    const data = await result.data;
//  console.log("the data", data)
    console.log('THE req', { single_event: data.single_event });
    res.render('pages/buy_ticket', { single_event: data.single_event });
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});