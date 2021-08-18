const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
let wallets;

function makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

   return result;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'wallets_resources');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, String(req.body.address));
    }
});

const upload = multer({storage: storage});

fs.readFile('wallets.json', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    wallets = JSON.parse(data);
});

app.get('/', (req, res) => {
    return res.send("WASSSUUUUUP NIIIGGEEEERR!!!");
});

app.get('/wallets', (req, res) => {
    return res.send(wallets);
});

app.get('/wallets/random', (req, res) => {
    return res.send(wallets[Math.floor(Math.random() * wallets.length)].address);
});

app.get('/wallets/:coin', (req, res) => {
    let walletsByCoin = [];

    for (let i = 0; i < wallets.length; i++) {
        if (wallets[i].coin === req.params.coin) {
            walletsByCoin.push(wallets[i]);
        }
    }

    if (walletsByCoin.length === 0) {
        return res.send('Coin not found');        
    }

    return res.send(walletsByCoin);
});

app.get('/wallets/list/export', (req, res) => {
    return res.download('wallets.json');
});

app.post('/wallets/add', upload.single('wallet-file'), (req, res) => {
    if (req.body.address === '') {
        req.body.address = `placeholder_id:${makeid(8)}`;
    }

    wallets.push(JSON.parse(JSON.stringify(req.body)));
    console.log(JSON.parse(JSON.stringify(req.body)));
    
    fs.writeFile('wallets.json', JSON.stringify(wallets), function (err) {
        if (err) return console.log(err);
        console.log('ADD: wallets > wallets.json');
    });

    console.log('New wallet was added!');
    return res.redirect('back');
});

app.delete('/wallets/delete/:address', (req, res) => {
    const removeIndex = wallets.findIndex(item => item.address === req.params.address);
    wallets.splice(removeIndex, 1);

    fs.writeFile('wallets.json', JSON.stringify(wallets), function (err) {
        if (err) return console.log(err);
        console.log('DELETE: wallets > wallets.json');
    });

    fs.unlink(`wallets_resources/${req.params.address}`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    console.log('The wallet was deleted!');
    return res.send("The wallet was deleted!");
});

app.get('/wallets/download/:address', (req, res) => {
    const file = `wallets_resources/${req.params.address}`;
    console.log(`File "${req.params.address}" is downloading!`);
    return res.download(file);
});

app.get('/.well-known/acme-challenge/beaij_gxf4avMOtHjPgzUSdxEq4x3Igf33Ow9PqGZng', (req, res) => {
    return res.send('beaij_gxf4avMOtHjPgzUSdxEq4x3Igf33Ow9PqGZng.26KprCRgUeL0G7t8AzurdybgW4I1jxxPSkRPbG2Ecw8');
});

app.listen(port, () =>
    console.log(`CriAPI listening on port ${port}!`),
);
