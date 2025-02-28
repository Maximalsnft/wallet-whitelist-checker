const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());
app.use(express.json());

// Load whitelist file
const whitelistFile = './backend/whitelist.json';

// ✅ Print whitelist on server start (for debugging)
fs.readFile(whitelistFile, 'utf8', (err, data) => {
    if (err) {
        console.error('❌ Error reading whitelist:', err);
    } else {
        console.log('✅ Whitelist Loaded:', data);
    }
});

// API route to check if wallet is whitelisted
app.post('/check-whitelist', (req, res) => {
    const { wallet } = req.body;

    if (!wallet) {
        return res.status(400).json({ message: 'Wallet address is required.' });
    }

    fs.readFile(whitelistFile, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading whitelist:', err);
            return res.status(500).json({ message: 'Error reading whitelist file.' });
        }

        const whitelist = JSON.parse(data);
        console.log('📡 Checking wallet:', wallet); // ✅ Debugging log
        console.log('🔍 Whitelist contains:', whitelist);

        if (whitelist.includes(wallet)) {
            res.json({ whitelisted: true });
        } else {
            res.json({ whitelisted: false });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
