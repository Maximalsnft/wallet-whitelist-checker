// Load whitelist from whitelist.js
let whitelist = (typeof WHITELIST_DATA !== "undefined") ? WHITELIST_DATA : [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkButton").addEventListener("click", checkWhitelist);
});

function checkWhitelist() {
    const walletInput = document.getElementById("walletInput").value.trim();
    const messageEl = document.getElementById("message");

    clearMessage();

    if (!walletInput || walletInput.length < 10) {
        showMessage("⚠ Invalid wallet address format.", "red");
        return;
    }

    const ethPattern = /^0x[a-fA-F0-9]{40}$/;
    if (!ethPattern.test(walletInput)) {
        showMessage("⚠ Please enter a valid Ethereum wallet address.", "red");
        return;
    }

    showMessage("⏳ Checking...", "blue");

    setTimeout(() => {
        if (whitelist.includes(walletInput.toLowerCase())) {
            showMessage("✅ Your wallet is whitelisted!", "green");
        } else {
            showMessage("❌ Your wallet is NOT whitelisted.", "red");
        }
    }, 1500);
}

function showMessage(text, color) {
    const messageEl = document.getElementById("message");
    messageEl.innerText = text;
    messageEl.style.color = color;
    messageEl.style.opacity = 1;
    setTimeout(() => {
        messageEl.style.opacity = 0;
    }, 2000);
}

function clearMessage() {
    const messageEl = document.getElementById("message");
    messageEl.innerText = "";
    messageEl.style.opacity = 0;
}
