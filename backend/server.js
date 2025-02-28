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
        console.log('✅ Whitelist loaded:', whitelist); // Debugging whitelist contents
        console.log('📡 Checking wallet:', wallet);

        if (whitelist.includes(wallet)) {
            console.log('✅ Wallet is whitelisted!');
            res.json({ whitelisted: true });
        } else {
            console.log('❌ Wallet NOT whitelisted.');
            res.json({ whitelisted: false });
        }
    });
});
