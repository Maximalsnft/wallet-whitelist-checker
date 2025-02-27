// Function to check if a wallet is whitelisted
async function checkWallet() {
    const inputAddress = document.getElementById("walletInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (!inputAddress) {
        resultDiv.innerHTML = "⚠️ Please enter a wallet address.";
        return;
    }

    try {
        // Fetch the whitelist JSON file
        const response = await fetch("whitelist.json");
        const data = await response.json();

        // Check if the entered address is in the whitelist
        if (data.whitelist.includes(inputAddress)) {
            resultDiv.innerHTML = "✅ Wallet is Whitelisted!";
        } else {
            resultDiv.innerHTML = "❌ Wallet is NOT Whitelisted!";
        }
    } catch (error) {
        console.error("Error fetching whitelist:", error);
        resultDiv.innerHTML = "⚠️ Error checking whitelist. Try again later.";
    }
}
