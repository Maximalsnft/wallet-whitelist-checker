function checkWhitelist() {
    let wallet = document.getElementById("walletInput").value.trim();
    let result = document.getElementById("result");

    if (!wallet) {
        result.innerHTML = "⚠️ Please enter a wallet address.";
        return;
    }

    console.log('🔍 Checking wallet:', wallet); // ✅ Debugging log

    fetch('https://nodejs-production-94c70.up.railway.app/check-whitelist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: wallet })
    })
    .then(response => response.json())
    .then(data => {
        console.log('📡 Server response:', data); // ✅ Debugging log

        if (data.whitelisted) {
            result.innerHTML = "✅ Your wallet is whitelisted!";
        } else {
            result.innerHTML = "❌ Your wallet is NOT whitelisted.";
        }
    })
    .catch(error => {
        console.error('⚠️ Error:', error);
        result.innerHTML = "⚠️ Error checking whitelist. Try again later.";
    });
}