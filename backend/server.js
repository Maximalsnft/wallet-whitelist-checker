const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Load the whitelist from the JSON file
const whitelistFile = './backend/whitelist.json';

// Route to check if a wallet is whitelisted
app.post('/check-whitelist', (req, res) => {
    const { wallet } = req.body;

    if (!wallet) {
        return res.status(400).json({ message: 'Wallet address is required.' });
    }

    fs.readFile(whitelistFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading whitelist file.' });
        }

        const whitelist = JSON.parse(data);
        if (whitelist.includes(wallet)) {
            res.json({ whitelisted: true });
        } else {
            res.json({ whitelisted: false });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
