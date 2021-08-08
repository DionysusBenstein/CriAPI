const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

app.use(cors())
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
let wallets;

fs.readFile('wallets.json', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    wallets = JSON.parse(data);
});

app.get('/', (req, res) => {
    return res.send("WASSSUUUUUP NIIIGGEEEERR!!!");
});

app.get('/wallets/random', (req, res) => {
    return res.send(wallets[Math.floor(Math.random() * wallets.length)].address);
});

app.get('/wallets', (req, res) => {
    let walletsArr = [];

    for (let i = 0; i < wallets.length; i++) {
        walletsArr.push(wallets[i].address);
    }

    return res.send(walletsArr);
});

app.post('/wallets/add', (req, res) => {
    wallets.push(req.body);
    console.log(wallets)

    fs.writeFile('wallets.json', JSON.stringify(wallets), function (err) {
        if (err) return console.log(err);
        console.log('wallets > wallets.json');
    });

    return res.send("New wallet was added!");
});

app.delete('/wallets/delete', (req, res) => {
    // TODO: Delete wallet from array by address and overwrite the JSON file
    return res.send("The wallet was deleted!");
});

app.listen(port, () =>
    console.log(`CriAPI listening on port ${port}!`),
);
