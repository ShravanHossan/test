const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();
app.listen(port, () =>{
    console.log(`Server is up on the port ${port}`)
});


hbs.registerPartials(__dirname + '/views/partials');

app.use((request, response, next) => {
    var time = new Date().toString();
    // console.log(`${time}: ${request.method} ${request.url}`);
    var log = `${time}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    });
    next();

});
console.log("error");

app.use((request, response, next) => {
    response.render('maintenance.hbs');
    next();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});


app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.send({
        name: 'Shravan Hossan',
        school: [
            'BCIT',
            'SFU',
            'UBC'
        ]
    })
});

app.get('/info', (request, response) => {
    // response.send('<h1>My info page</h1>');
    response.render('about.hbs', {
        title: "About page",
        year: new Date().getFullYear(),
        welcome: 'Hello!',
        intro: 'In accordance with the Machinery\'s handbook'
    });
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});


