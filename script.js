// ===== SIDEBAR NAVIGATION =====
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
let isFocusMode = false;

menuBtn.onclick = () => {
    if (isFocusMode) {
        // Exit focus mode
        exitFocusMode();
    } else {
        // Open sidebar
        sidebar.classList.add("active");
        overlay.style.display = "block";
    }
};

overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
};

// ===== PAGE NAVIGATION =====
const home = document.getElementById("home");
const lirik = document.getElementById("lirik");

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
}

document.getElementById("home-btn").onclick = () => {
    home.classList.add("active");
    lirik.classList.remove("active");
    closeSidebar();
};

document.getElementById("lirik-btn").onclick = () => {
    lirik.classList.add("active");
    home.classList.remove("active");
    closeSidebar();
};

// ===== FOCUS MODE (Nikmati Background) =====
function enterFocusMode() {
    isFocusMode = true;
    sidebar.classList.remove("active");
    overlay.style.display = "none";
    
    // Hide all pages and content
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });
    
    // Hide all sections
    document.querySelectorAll(".section").forEach(section => {
        section.style.opacity = "0";
        section.style.pointerEvents = "none";
    });
    
    // Hide sidebar
    sidebar.style.opacity = "0";
    sidebar.style.pointerEvents = "none";
    
    // Style menu button untuk focus mode
    menuBtn.style.background = "rgba(0, 212, 255, 0.2)";
    menuBtn.style.borderColor = "#00d4ff";
    menuBtn.classList.add("focus-mode-active");
    
    // Add tooltip
    menuBtn.title = "Klik untuk keluar dari mode nikmati";
}

function exitFocusMode() {
    isFocusMode = false;
    
    // Show all pages and content
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "";
    });
    
    // Re-apply active page
    const activePage = document.querySelector(".page.active");
    if (activePage) {
        activePage.style.display = "block";
    }
    
    // Show sections
    document.querySelectorAll(".section").forEach(section => {
        section.style.opacity = "1";
        section.style.pointerEvents = "auto";
    });
    
    // Show sidebar
    sidebar.style.opacity = "1";
    sidebar.style.pointerEvents = "auto";
    
    // Reset menu button
    menuBtn.style.background = "";
    menuBtn.style.borderColor = "";
    menuBtn.classList.remove("focus-mode-active");
    menuBtn.title = "";
}

document.getElementById("focus-btn").onclick = () => {
    enterFocusMode();
    closeSidebar();
};

// ===== PEMBUAT =====
document.getElementById("creator-btn").onclick = () => {
    const creatorName = document.getElementById("creator-name");
    creatorName.classList.toggle("hidden");
    // Hide enemy name if showing
    const enemyName = document.getElementById("enemy-name");
    if (!enemyName.classList.contains("hidden")) {
        enemyName.classList.add("hidden");
    }
};

// ===== MUSUH PEMBUAT =====
document.getElementById("enemy-btn").onclick = () => {
    const enemyName = document.getElementById("enemy-name");
    enemyName.classList.toggle("hidden");
    // Hide creator name if showing
    const creatorName = document.getElementById("creator-name");
    if (!creatorName.classList.contains("hidden")) {
        creatorName.classList.add("hidden");
    }
};

// ===== CALCULATOR =====
let display = document.getElementById("display");
let historyList = document.getElementById("history-list");

document.querySelectorAll(".btn-calc").forEach(btn => {
    btn.onclick = () => {
        let val = btn.textContent;
        
        if (val === "C") {
            display.value = "";
        } else if (val === "=") {
            try {
                let result = eval(display.value);
                if (display.value.trim() !== "") {
                    historyList.innerHTML += `<li>${display.value} = ${result}</li>`;
                }
                display.value = result;
            } catch (error) {
                display.value = "Error";
                setTimeout(() => {
                    display.value = "";
                }, 1500);
            }
        } else {
            display.value += val;
        }
    };
});

// Keyboard Support untuk Calculator
document.addEventListener("keydown", e => {
    const calcActive = display === document.activeElement || document.body.contains(display);
    
    if ("0123456789+-*/".includes(e.key)) {
        display.value += e.key;
    }
    if (e.key === "Enter") {
        e.preventDefault();
        try {
            let result = eval(display.value);
            if (display.value.trim() !== "") {
                historyList.innerHTML += `<li>${display.value} = ${result}</li>`;
            }
            display.value = result;
        } catch (error) {
            display.value = "Error";
            setTimeout(() => {
                display.value = "";
            }, 1500);
        }
    }
    if (e.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }
});

// ===== KERANG AJAIB =====
const kerangAnswers = [
    "Iya 😏",
    "Tidak 😌",
    "Mungkin 🤔",
    "Tentu saja 🔥",
    "Nggak jelas 😕",
    "Tanyakan lagi 🔮"
];

document.getElementById("kerang-btn").onclick = () => {
    const randomAnswer = kerangAnswers[Math.floor(Math.random() * kerangAnswers.length)];
    const kerangJawab = document.getElementById("kerang-jawab");
    kerangJawab.textContent = randomAnswer;
    kerangJawab.classList.add("show-answer");
    setTimeout(() => {
        kerangJawab.classList.remove("show-answer");
    }, 3000);
};

// ===== PRIA UNGU MODAL =====
document.getElementById("mulai-btn").onclick = () => {
    const ungu = document.getElementById("ungu");
    ungu.classList.remove("hidden");
    ungu.classList.add("show");
    document.body.style.overflow = "hidden";
};

document.getElementById("tutup-ungu").onclick = () => {
    const ungu = document.getElementById("ungu");
    ungu.classList.remove("show");
    ungu.classList.add("hidden");
    document.body.style.overflow = "auto";
};

// Close modal saat klik overlay
document.getElementById("ungu").addEventListener("click", (e) => {
    if (e.target.id === "ungu") {
        document.getElementById("tutup-ungu").click();
    }
});

// ===== LIRIK LAGU =====
document.getElementById("mulut-btn").onclick = () => {
    const lirikText = document.getElementById("lirik-text");
    lirikText.textContent = "🎤 Cobainnnnn si mulut panjang\n\nSuka makan orang jelek dan jahat";
    lirikText.classList.add("fade-in");
    setTimeout(() => {
        lirikText.classList.remove("fade-in");
    }, 500);
};

document.getElementById("adam-btn").onclick = () => {
    const lirikText = document.getElementById("lirik-text");
    lirikText.textContent = "😎 Adam Ganteng\n\nadam ganteng adam super ganteng\nteng teng adam adam adaaammm\n\nadam ganteng adam super ganteng\nteng teng adam adam adaaammm 🔥";
    lirikText.classList.add("fade-in");
    setTimeout(() => {
        lirikText.classList.remove("fade-in");
    }, 500);
};

// ===== THEME CUSTOMIZER =====
const primaryColorInput = document.getElementById("primary-color");
const accentColorInput = document.getElementById("accent-color");
const bgColorInput = document.getElementById("bg-color");
const resetThemeBtn = document.getElementById("reset-theme-btn");

// Debug: check if elements are found
console.log("Theme inputs found:", {
    primary: primaryColorInput,
    accent: accentColorInput,
    bg: bgColorInput,
    reset: resetThemeBtn
});

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem("customTheme");
    if (savedTheme) {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme);
        primaryColorInput.value = theme.primary;
        accentColorInput.value = theme.accent;
        bgColorInput.value = theme.bg;
        console.log("Theme loaded from localStorage:", theme);
    }
}

function applyTheme(theme) {
    console.log("Applying theme:", theme);
    
    // Convert hex to RGB for rgba usage
    const primaryRGB = hexToRgb(theme.primary);
    const accentRGB = hexToRgb(theme.accent);
    
    document.documentElement.style.setProperty("--primary-color", theme.primary);
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    document.documentElement.style.setProperty("--bg-color", theme.bg);
    document.documentElement.style.setProperty("--primary-rgb", primaryRGB);
    document.documentElement.style.setProperty("--accent-rgb", accentRGB);
    
    console.log("CSS Variables updated!");
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 212, 255";
}

if (primaryColorInput) {
    primaryColorInput.addEventListener("input", (e) => {
        console.log("Primary color changed:", e.target.value);
        const theme = {
            primary: primaryColorInput.value,
            accent: accentColorInput.value,
            bg: bgColorInput.value
        };
        applyTheme(theme);
        localStorage.setItem("customTheme", JSON.stringify(theme));
    });
}

if (accentColorInput) {
    accentColorInput.addEventListener("input", (e) => {
        console.log("Accent color changed:", e.target.value);
        const theme = {
            primary: primaryColorInput.value,
            accent: accentColorInput.value,
            bg: bgColorInput.value
        };
        applyTheme(theme);
        localStorage.setItem("customTheme", JSON.stringify(theme));
    });
}

if (bgColorInput) {
    bgColorInput.addEventListener("input", (e) => {
        console.log("BG color changed:", e.target.value);
        const theme = {
            primary: primaryColorInput.value,
            accent: accentColorInput.value,
            bg: bgColorInput.value
        };
        applyTheme(theme);
        localStorage.setItem("customTheme", JSON.stringify(theme));
    });
}

if (resetThemeBtn) {
    resetThemeBtn.onclick = () => {
        console.log("Resetting theme to default");
        const defaultTheme = {
            primary: "#00d4ff",
            accent: "#ff006e",
            bg: "#0a0a0a"
        };
        applyTheme(defaultTheme);
        primaryColorInput.value = defaultTheme.primary;
        accentColorInput.value = defaultTheme.accent;
        bgColorInput.value = defaultTheme.bg;
        localStorage.removeItem("customTheme");
        console.log("Theme reset complete!");
    };
}

// ===== ROCK PAPER SCISSORS GAME =====
const choices = ["rock", "paper", "scissors"];
const rpsButtons = document.querySelectorAll(".rps-btn");
const gameResult = document.getElementById("game-result");
const userWinsDisplay = document.getElementById("user-wins");
const aiWinsDisplay = document.getElementById("ai-wins");
const resetGameBtn = document.getElementById("reset-game-btn");

let userWins = localStorage.getItem("rpsUserWins") ? parseInt(localStorage.getItem("rpsUserWins")) : 0;
let aiWins = localStorage.getItem("rpsAiWins") ? parseInt(localStorage.getItem("rpsAiWins")) : 0;

userWinsDisplay.textContent = userWins;
aiWinsDisplay.textContent = aiWins;

rpsButtons.forEach(btn => {
    btn.onclick = () => {
        const userChoice = btn.dataset.choice;
        const aiChoice = choices[Math.floor(Math.random() * choices.length)];
        
        let result = "";
        let emojiUser = userChoice === "rock" ? "🪨" : userChoice === "paper" ? "📄" : "✂️";
        let emojiAi = aiChoice === "rock" ? "🪨" : aiChoice === "paper" ? "📄" : "✂️";
        
        if (userChoice === aiChoice) {
            result = `${emojiUser} vs ${emojiAi} - Seri!`;
        } else if (
            (userChoice === "rock" && aiChoice === "scissors") ||
            (userChoice === "paper" && aiChoice === "rock") ||
            (userChoice === "scissors" && aiChoice === "paper")
        ) {
            result = `${emojiUser} vs ${emojiAi} - Kamu menang! 🎉`;
            userWins++;
            userWinsDisplay.textContent = userWins;
            localStorage.setItem("rpsUserWins", userWins);
        } else {
            result = `${emojiUser} vs ${emojiAi} - AI menang! 🤖`;
            aiWins++;
            aiWinsDisplay.textContent = aiWins;
            localStorage.setItem("rpsAiWins", aiWins);
        }
        
        gameResult.textContent = result;
        gameResult.classList.add("show-result");
        setTimeout(() => {
            gameResult.classList.remove("show-result");
        }, 3000);
    };
});

resetGameBtn.onclick = () => {
    userWins = 0;
    aiWins = 0;
    userWinsDisplay.textContent = "0";
    aiWinsDisplay.textContent = "0";
    gameResult.textContent = "";
    localStorage.removeItem("rpsUserWins");
    localStorage.removeItem("rpsAiWins");
};

// ===== QUOTE GENERATOR =====
const quotes = [
    "I'd rather be hated for who I am, than loved for who I am not.",
    "Wanting to be someone else is a waste of the person you are.",
    "Come as you are, as you were, as I want you to be.",
    "The duty of youth is to challenge corruption.",
    "I'm so happy, 'cause today I found my friends.",
    "I'm more of a rhythmic player. My soloing is pretty much limited.",
    "If you ever need anything please don't hesitate to ask.",
    "Thank you for the music. Thank you for the vibe. Thank you for everything.",
    "I'm not well and I wish I wasn't here."
];

const quoteText = document.getElementById("quote-text");
const newQuoteBtn = document.getElementById("new-quote-btn");
const copyQuoteBtn = document.getElementById("copy-quote-btn");

function displayNewQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${randomQuote}" - Kurt Cobain`;
    quoteText.classList.add("quote-fadeIn");
    setTimeout(() => {
        quoteText.classList.remove("quote-fadeIn");
    }, 500);
}

newQuoteBtn.onclick = () => {
    displayNewQuote();
};

copyQuoteBtn.onclick = () => {
    const text = quoteText.textContent;
    navigator.clipboard.writeText(text).then(() => {
        copyQuoteBtn.textContent = "✓ Tercopy!";
        setTimeout(() => {
            copyQuoteBtn.textContent = "📋 Copy";
        }, 2000);
    });
};

// Load initial quote
displayNewQuote();

// Load theme on page load
loadTheme();

// ===== EDIT IDENTITY (F1 KEY) =====
const editIdentityModal = document.getElementById("edit-identity-modal");
const editNameInput = document.getElementById("edit-name");
const saveIdentityBtn = document.getElementById("save-identity-btn");
const cancelIdentityBtn = document.getElementById("cancel-identity-btn");
const displayName = document.getElementById("display-name");

// Default values
const defaultName = "Adam Ganteng";

// F1 key listener
document.addEventListener("keydown", (e) => {
    if (e.key === "F1") {
        e.preventDefault();
        openEditIdentityModal();
    }
});

function openEditIdentityModal() {
    editIdentityModal.classList.remove("hidden");
    editIdentityModal.classList.add("show");
    editNameInput.focus();
}

function closeEditIdentityModal() {
    editIdentityModal.classList.remove("show");
    editIdentityModal.classList.add("hidden");
}

saveIdentityBtn.onclick = () => {
    const newName = editNameInput.value.trim() || defaultName;
    
    // Update display (sementara, tidak disimpan)
    displayName.textContent = `👤 ${newName}`;
    
    closeEditIdentityModal();
};

cancelIdentityBtn.onclick = () => {
    // Reset input values ke current display
    editNameInput.value = displayName.textContent.replace("👤 ", "");
    closeEditIdentityModal();
};

// Close modal when clicking outside
editIdentityModal.addEventListener("click", (e) => {
    if (e.target.id === "edit-identity-modal") {
        closeEditIdentityModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !editIdentityModal.classList.contains("hidden")) {
        closeEditIdentityModal();
    }
});

// ===== EDIT GAME SCORE (F2 KEY) =====
const editScoreModal = document.getElementById("edit-score-modal");
const editUserWinsInput = document.getElementById("edit-user-wins");
const editAiWinsInput = document.getElementById("edit-ai-wins");
const saveScoreBtn = document.getElementById("save-score-btn");
const cancelScoreBtn = document.getElementById("cancel-score-btn");

// F2 key listener
document.addEventListener("keydown", (e) => {
    if (e.key === "F2") {
        e.preventDefault();
        openEditScoreModal();
    }
});

function openEditScoreModal() {
    // Set current values
    editUserWinsInput.value = userWins;
    editAiWinsInput.value = aiWins;
    
    editScoreModal.classList.remove("hidden");
    editScoreModal.classList.add("show");
    editUserWinsInput.focus();
}

function closeEditScoreModal() {
    editScoreModal.classList.remove("show");
    editScoreModal.classList.add("hidden");
}

saveScoreBtn.onclick = () => {
    let newUserWins = parseInt(editUserWinsInput.value);
    let newAiWins = parseInt(editAiWinsInput.value);
    
    // Validation
    if (isNaN(newUserWins) || newUserWins < 0) newUserWins = 0;
    if (isNaN(newAiWins) || newAiWins < 0) newAiWins = 0;
    
    // Update values (sementara, tidak disimpan)
    userWins = newUserWins;
    aiWins = newAiWins;
    
    // Update display
    userWinsDisplay.textContent = userWins;
    aiWinsDisplay.textContent = aiWins;
    
    closeEditScoreModal();
};

cancelScoreBtn.onclick = () => {
    // Reset input values
    editUserWinsInput.value = userWins;
    editAiWinsInput.value = aiWins;
    closeEditScoreModal();
};

// Close modal when clicking outside
editScoreModal.addEventListener("click", (e) => {
    if (e.target.id === "edit-score-modal") {
        closeEditScoreModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !editScoreModal.classList.contains("hidden")) {
        closeEditScoreModal();
    }
});
