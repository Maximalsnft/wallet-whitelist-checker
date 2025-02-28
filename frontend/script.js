function checkWhitelist() {
    let wallet = document.getElementById("walletInput").value;
    let result = document.getElementById("result");

    if (!wallet) {
        result.innerHTML = "⚠️ Please enter a wallet address.";
        return;
    }

    fetch('https://nodejs-production-94c70.up.railway.app/check-whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: wallet })
    })
    .then(response => response.json())
    .then(data => {
        if (data.whitelisted) {
            result.innerHTML = "✅ Your wallet is whitelisted!";
        } else {
            result.innerHTML = "❌ Your wallet is NOT whitelisted.";
        }
    })
    .catch(error => {
        result.innerHTML = "⚠️ Error checking whitelist. Try again later.";
    });
}
