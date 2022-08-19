// import fetch from "node-fetch";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const express = require('express');
let http = require('http');
let app = express();
let path = require("path");
let PORT = process.env.PORT || 3220;
let ejs = require('ejs');
const axios = require("axios");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
// const { createUser } = require('middlewares/create_user');
const { response } = require('express');
const { default: html2canvas } = require('html2canvas');
// import html2canvas from 'html2canvas';
// const html2canvas = require(html2canvas);




// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.AUTH_SECRET,
//     baseURL: process.env.AUTH_BASEURL,
//     clientID: process.env.AUTH_CLIENTID,
//     issuerBaseURL: process.env.AUTH_ISSUER_BASEURL
//   };
let ticket_info;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// public 
app.use(express.static('public'));
// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));


app.get('/', async (req, res) => {
    const result = await axios("http://localhost:3200/all_events");
    const data = result.data;
    res.render('pages/index', { events: data.all_events});
});
app.get('/buy_ticket', (req, res) => {
    res.render('pages/buy_ticket');
});
app.get('/ticket', (req, res) => {
    res.render('pages/ticket');
});
app.get('/event_form', [requiresAuth()], (req, res) => {
    res.render('pages/event_form');
});
app.get('/dashboard', [requiresAuth()] , (req, res) => {
    res.render('pages/dashboard');
});
app.get('/dashboard_new', [requiresAuth()] , (req, res) => {
    res.render('pages/dashboard_new');
});
app.get('/tables', [requiresAuth()] , (req, res) => {
    res.render('pages/tables');
});
app.post('/events', async (req, res) => {
    try {
        let events_data = req.body;
        console.log("This events data: ", events_data);
        const data = await axios.post('http://localhost:3200/events', events_data);

        

        res.redirect('/');
        // console.log({ data });

    } catch (error) {
        console.log("Error: ", error.message)
    }

});
app.post('/tickets', async (req, res) => {
            
    try {
        let tickets_data = req.body;
        console.log("I wan to see", tickets_data);
        const data = await axios.post('http://localhost:3200/tickets', tickets_data);
        let success_msg = data.statusText;
        console.log({success_msg})
        if (success_msg === 'OK'){
            ticket_info = { ticket: data.config.data };
            console.log("ticket info", ticket_info);
            res.json(ticket_info);
            
        }else{
            res.json("There was an error Mr Fool, fix it asap.");
        }

    } catch (error) {
        console.log("Error: ", error.message)
    }

});

app.get('/event/:id', async (req, res) => {
    let event_id_query = req.params.id;
    console.log("Event query", event_id_query)
    const result = await axios(`http://localhost:3200/event/${event_id_query}`);
    const data = await result.data;
    console.log('THE req', { single_event: data.single_event });
    res.render('pages/buy_ticket', { single_event: data.single_event });
});

// app.get('/ticket', async (req, res) => {
//     // let ticket_id_query = req.params.id;
//     // console.log("Ticket query", ticket_id_query)
//     // const result = await axios(`http://localhost:3200/ticket/${ticket_id_query}`);
//     // const data = await result.data;
//     // console.log('Tickets', { single_ticket: data.single_ticket });
//     res.render('pages/ticket', { single_ticket: data.single_ticket });
//     res.render("pages/ticket");
// });

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});