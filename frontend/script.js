/*******************************************************/
/*           Maximals NFT Whitelist Checker            */
/*   Interactive, Responsive, and Robust Frontend Code  */
/*******************************************************/

/* ------------------------------- */
/* Global Variables & Initialization */
/* ------------------------------- */
// The whitelist is loaded from whitelist.js (if it exists). If not, fallback to an empty array.
let whitelist = (typeof WHITELIST_DATA !== "undefined") ? WHITELIST_DATA : [];

// Initialize event listeners when DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Optionally load any stored history (future expansion)
    loadHistory();

    // Set up the event listener for scroll to reveal sections (if needed in future)
    // (No additional preview section is used here, so this is optional.)

    // Set up event listeners for interactive buttons in the preview section, if present
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");

    if (yesButton) {
        yesButton.addEventListener("click", () => {
            // Redirect to maximalsnft.com when "Yes" is clicked
            window.location.href = "https://maximalsnft.com";
        });
    }

    if (noButton) {
        noButton.addEventListener("click", () => {
            // Show a sad emoji and message for 2 seconds when "No" is clicked
            showNoMessage("😢 OH THAT'S SAD");
        });
    }
});

/*******************************************************/
/* Function: checkWhitelist                            */
/* Validates wallet input and provides interactive     */
/* feedback (success or error) that fades out after 2 sec */
/*******************************************************/
function checkWhitelist() {
    const walletInput = document.getElementById("walletInput").value.trim();
    const messageEl = document.getElementById("message");

    // Clear any previous messages
    clearMessage();

    // Basic validation: non-empty and minimum length check (10 characters as a rough threshold)
    if (!walletInput || walletInput.length < 10) {
        showMessage("⚠ Invalid wallet address format. Please check and try again.", "red");
        return;
    }

    // Further validation using regular expressions for common wallet formats:
    // Ethereum: 0x followed by exactly 40 hexadecimal characters
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    // Bitcoin: Starts with 1 or 3 and is 26-35 characters long (basic validation)
    const btcRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    // Solana: Base58 encoded, typically 32-44 characters (basic validation)
    const solRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

    // If the wallet address does not match any of the above patterns, show an error.
    if (!(ethRegex.test(walletInput) || btcRegex.test(walletInput) || solRegex.test(walletInput))) {
        showMessage("⚠ Please enter a valid wallet address (Ethereum, Bitcoin, or Solana format).", "red");
        return;
    }

    // Simulate a loading state for a smooth user experience
    showMessage("⏳ Checking...", "blue");

    // Simulated delay (1.5 seconds) to mimic processing time and allow for message animations
    setTimeout(() => {
        // Normalize input and whitelist for case-insensitive comparison
        const normalizedInput = walletInput.toLowerCase();
        const normalizedWhitelist = whitelist.map(addr => addr.toLowerCase());

        if (normalizedWhitelist.includes(normalizedInput)) {
            showMessage("✅ Your wallet is whitelisted!", "green");
        } else {
            showMessage("❌ Your wallet is NOT whitelisted.", "red");
        }

        // Optionally update history for debugging/future features
        updateHistory(walletInput);
    }, 1500);
}

/*******************************************************/
/* Function: showMessage & clearMessage                */
/* Displays messages that fade out after 2 seconds      */
/*******************************************************/
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

/*******************************************************/
/* Function: showNoMessage                             */
/* Specific feedback for the "No" button action         */
/*******************************************************/
function showNoMessage(text) {
    const messageEl = document.getElementById("message");
    messageEl.innerText = text;
    messageEl.style.color = "red";
    messageEl.style.opacity = 1;
    setTimeout(() => {
        messageEl.style.opacity = 0;
    }, 2000);
}

/*******************************************************/
/* Functions: History Management (Optional)          */
/* This section tracks the last 5 wallet addresses      */
/* that have been checked (for debugging/future use)    */
/*******************************************************/
function updateHistory(wallet) {
    let history = JSON.parse(localStorage.getItem("checkedHistory")) || [];
    if (!history.includes(wallet)) {
        history.unshift(wallet);
        if (history.length > 5) {
            history = history.slice(0, 5);
        }
        localStorage.setItem("checkedHistory", JSON.stringify(history));
        renderHistory(history);
    }
}

function renderHistory(history) {
    let historyList = document.getElementById("historyList");
    if (!historyList) {
        historyList = document.createElement("ul");
        historyList.id = "historyList";
        // For now, hide the history list from the UI
        historyList.style.display = "none";
        document.body.appendChild(historyList);
    }
    historyList.innerHTML = "";
    history.forEach(wallet => {
        let li = document.createElement("li");
        li.innerText = wallet;
        historyList.appendChild(li);
    });
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("checkedHistory")) || [];
    renderHistory(history);
}

/*******************************************************/
/* Function: revealPreviewSection                      */
/* (Optional) Reveals the preview section on scroll;   */
/* Not used in this simplified version, but kept for    */
/* potential future expansion.                           */
/*******************************************************/
function revealPreviewSection() {
    const previewSection = document.getElementById("previewSection");
    if (!previewSection) return;
    const rect = previewSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
        previewSection.classList.add("active");
    }
}

/*******************************************************/
/* Additional Debug Logging (For Robustness)           */
/*******************************************************/
function debugLog(message, data = null) {
    console.log("[DEBUG]", message, data);
}

// Initial debug log on page load
debugLog("Page loaded – Maximals NFT Whitelist Checker initialized.");
