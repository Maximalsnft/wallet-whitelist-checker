const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000; // You can change this port if needed

// Middleware: Allow frontend to communicate with backend & handle JSON requests
app.use(cors());
app.use(express.json());

const whitelistFile = "whitelist.json";

// Function to load whitelist from file
const loadWhitelist = () => {
    if (fs.existsSync(whitelistFile)) {
        return JSON.parse(fs.readFileSync(whitelistFile, "utf8"));
    }
    return [];
};

// API to check if a wallet is whitelisted
app.get("/check/:wallet", (req, res) => {
    const wallet = req.params.wallet;
    const whitelist = loadWhitelist();

    if (whitelist.includes(wallet)) {
        res.json({ whitelisted: true });
    } else {
        res.json({ whitelisted: false });
    }
});

// API to add a wallet to the whitelist
app.post("/add", (req, res) => {
    const { wallet } = req.body;
    if (!wallet) return res.json({ error: "Wallet address is required" });

    let whitelist = loadWhitelist();

    if (!whitelist.includes(wallet)) {
        whitelist.push(wallet);
        fs.writeFileSync(whitelistFile, JSON.stringify(whitelist, null, 2));
        res.json({ success: true, message: "Wallet added to whitelist" });
    } else {
        res.json({ success: false, message: "Wallet already whitelisted" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

