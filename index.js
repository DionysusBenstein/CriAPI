const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const wallets = [
    "bc1q6w0eufkfhya4xjpyqnvkwcdt9a2kca8am097um", // wallet_1
    "bc1qsvxgmuk5mlrw7u9fkz3cx7ktm68vfg5vc23zll", // wallet_2
    "bc1qswzslgwke7xaz4vq9ph9q7yrvfj5pwyyt74rf8", // wallet_3
    "bc1q2wzdljaxn7exrylhpx6kn30pftlrkgx6pxuqqj", // wallet_4
    "bc1qunsa0cz59q5t6wtna3lhhkekt2zhmz0pjpl8fr", // wallet_5
    "bc1qvds3da29lhakrupsw8uuunn5p0advvtz2wucpy", // wallet_6
    "bc1qz7mgqcsa5hsj3k66dkkayl7kmshndtecf50myn", // wallet_7
    "bc1qyud9v3pwskef3mhpf9w8hc4ktfph4072hshjms"  // wallet_8
]

app.get('/', (req, res) => {
    return res.send("WASSSUUUUUP NIIIGGEEEERR!!!");
});

app.get('/get-random-wallet', (req, res) => {
    return res.send(wallets[Math.floor(Math.random() * wallets.length)]);
});

app.listen(port, () =>
  console.log(`CriAPI listening on port ${port}!`),
);
