const express = require('express');
const fs = require('fs')
const ex = require('../class 7/challenge')

var baseAmount = 100;
var baseCurrency = 'USD';
var exchangeCurrency = ['CAD', 'PLN'];


var app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
    response.send(fs.readFileSync('public/index.html', 'utf-8'))
});

app.get('/info', (request, response) => {
    response.send(fs.readFileSync('public/about.html', 'utf-8'))
});

app.get('/converter', (request, response) => {
    baseHTML = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Convert it all!</title>
            <script src = "convert.js"></script>
            <style>
                    body{
                        font-family: "Agency FB";
                        color:aliceblue;
                        background-color: black;
                        text-align: center;
                        word-wrap: normal;
                    }
            </style>
        </head>
        <body>
        <div>`;
    // response.send(fs.readFileSync('public/converter.html', 'utf-8'))
    ex.exchange(baseAmount, baseCurrency, exchangeCurrency)
        .then((result) => {
            response.send(baseHTML + result + '</body></body></html>');})
        .catch((e) => {
            response.send(baseHTML + e.message + '</body></body></html>');
        });
});

app.get('/404', (request, response) => {
    request.send({
        error: 'Page not found'
    })
})

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});