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
const profilePage = document.getElementById("profile");
const settingsPage = document.getElementById("settings");
const gamesHubPage = document.getElementById("games-hub");
const analyticsPage = document.getElementById("analytics");

console.log("Page variables loaded:", { home, lirik, profilePage, settingsPage, gamesHubPage, analyticsPage });

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
}

document.getElementById("home-btn").onclick = () => {
    home.classList.add("active");
    lirik.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    closeSidebar();
    if (soundFx) soundFx.playSound('whoosh');
};

document.getElementById("lirik-btn").onclick = () => {
    lirik.classList.add("active");
    home.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    closeSidebar();
    if (soundFx) soundFx.playSound('whoosh');
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

// ===== SOUND EFFECTS SYSTEM =====
class SoundEffects {
    constructor() {
        this.enabled = localStorage.getItem("soundEnabled") !== "false";
        this.volume = parseInt(localStorage.getItem("soundVolume")) || 50;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playSound(type) {
        if (!this.enabled) return;

        const ctx = this.audioContext;
        const now = ctx.currentTime;
        const gainNode = ctx.createGain();
        gainNode.gain.value = this.volume / 100;
        gainNode.connect(ctx.destination);

        const oscillator = ctx.createOscillator();
        oscillator.connect(gainNode);

        switch (type) {
            case 'click':
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                oscillator.start(now);
                oscillator.stop(now + 0.1);
                break;

            case 'success':
                oscillator.frequency.setValueAtTime(523, now);
                oscillator.frequency.setValueAtTime(659, now + 0.1);
                oscillator.frequency.setValueAtTime(784, now + 0.2);
                oscillator.type = 'sine';
                gainNode.gain.setValueAtTime(0.15, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;

            case 'error':
                oscillator.frequency.setValueAtTime(200, now);
                oscillator.frequency.setValueAtTime(150, now + 0.1);
                oscillator.type = 'sawtooth';
                gainNode.gain.setValueAtTime(0.1, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                oscillator.start(now);
                oscillator.stop(now + 0.2);
                break;

            case 'whoosh':
                oscillator.frequency.setValueAtTime(400, now);
                oscillator.frequency.exponentialRampToValueAtTime(80, now + 0.3);
                oscillator.type = 'triangle';
                gainNode.gain.setValueAtTime(0.12, now);
                gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                oscillator.start(now);
                oscillator.stop(now + 0.3);
                break;
        }
    }

    setVolume(value) {
        this.volume = value;
        localStorage.setItem("soundVolume", value);
    }

    toggle(enabled) {
        this.enabled = enabled;
        localStorage.setItem("soundEnabled", enabled);
    }
}

const soundFx = new SoundEffects();

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;

    container.appendChild(toast);
    soundFx.playSound('click');

    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// ===== F3 - EDIT BIO =====
const editBioModal = document.getElementById("edit-bio-modal");
const editBioInput = document.getElementById("edit-bio");
const saveBioBtn = document.getElementById("save-bio-btn");
const cancelBioBtn = document.getElementById("cancel-bio-btn");
const profileBio = document.getElementById("profile-bio");
const editBioButtonInProfile = document.getElementById("edit-bio-btn");

let currentBio = "Seorang developer yang ganteng";

document.addEventListener("keydown", (e) => {
    if (e.key === "F3") {
        e.preventDefault();
        openEditBioModal();
    }
});

function openEditBioModal() {
    editBioModal.classList.remove("hidden");
    editBioModal.classList.add("show");
    editBioInput.focus();
    soundFx.playSound('whoosh');
}

function closeEditBioModal() {
    editBioModal.classList.remove("show");
    editBioModal.classList.add("hidden");
}

saveBioBtn.onclick = () => {
    const newBio = editBioInput.value.trim() || currentBio;
    currentBio = newBio;
    profileBio.textContent = currentBio;
    closeEditBioModal();
    showToast("✏️ Bio updated!", "success");
    soundFx.playSound('success');
};

cancelBioBtn.onclick = () => {
    editBioInput.value = currentBio;
    closeEditBioModal();
};

editBioButtonInProfile.onclick = () => {
    openEditBioModal();
};

editBioModal.addEventListener("click", (e) => {
    if (e.target.id === "edit-bio-modal") {
        closeEditBioModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !editBioModal.classList.contains("hidden")) {
        closeEditBioModal();
    }
});

// ===== KEYBOARD SHORTCUTS GUIDE =====
const shortcutsModal = document.getElementById("shortcuts-modal");
const closeShortcutsBtn = document.getElementById("close-shortcuts-btn");

document.addEventListener("keydown", (e) => {
    if (e.key === "?") {
        e.preventDefault();
        openShortcutsModal();
    }
});

function openShortcutsModal() {
    shortcutsModal.classList.remove("hidden");
    shortcutsModal.classList.add("show");
    soundFx.playSound('whoosh');
}

function closeShortcutsModal() {
    shortcutsModal.classList.remove("show");
    shortcutsModal.classList.add("hidden");
}

closeShortcutsBtn.onclick = () => closeShortcutsModal();

shortcutsModal.addEventListener("click", (e) => {
    if (e.target.id === "shortcuts-modal") {
        closeShortcutsModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !shortcutsModal.classList.contains("hidden")) {
        closeShortcutsModal();
    }
});

// ===== LEADERBOARD SYSTEM =====
class Leaderboard {
    constructor() {
        this.scores = this.loadScores();
    }

    addScore(name, score) {
        this.scores.push({
            name: name,
            score: score,
            date: new Date().toLocaleDateString()
        });
        this.scores.sort((a, b) => b.score - a.score);
        this.scores = this.scores.slice(0, 10);
        this.saveScores();
    }

    loadScores() {
        const saved = localStorage.getItem("leaderboard");
        return saved ? JSON.parse(saved) : [];
    }

    saveScores() {
        localStorage.setItem("leaderboard", JSON.stringify(this.scores));
    }

    getScores() {
        return this.scores;
    }

    clear() {
        this.scores = [];
        this.saveScores();
    }
}

const leaderboard = new Leaderboard();

function updateLeaderboard(userWinsCount) {
    if (userWinsCount > 0 && userWinsCount % 5 === 0) {
        leaderboard.addScore(displayName.textContent.replace("👤 ", ""), userWinsCount);
        showToast("🏆 Score added to leaderboard!", "success");
    }
}

// ===== PROFILE PAGE MANAGER =====
function updateProfileStats() {
    const totalGames = userWins + aiWins;
    const winRate = totalGames > 0 ? Math.round((userWins / totalGames) * 100) : 0;
    const bestScore = leaderboard.getScores().length > 0 ? leaderboard.getScores()[0].score : 0;

    document.getElementById("stat-total-games").textContent = totalGames;
    document.getElementById("stat-win-rate").textContent = winRate + "%";
    document.getElementById("stat-best-score").textContent = bestScore;
    document.getElementById("stat-games-count").textContent = totalGames;

    updateLeaderboardDisplay();
}

function updateLeaderboardDisplay() {
    const leaderboardList = document.getElementById("leaderboard-list");
    const scores = leaderboard.getScores();

    if (scores.length === 0) {
        leaderboardList.innerHTML = '<p class="empty-message">Mulai bermain untuk masuk leaderboard!</p>';
        return;
    }

    leaderboardList.innerHTML = scores.map((item, index) => `
        <div class="leaderboard-item">
            <span class="leaderboard-rank">#${index + 1}</span>
            <span class="leaderboard-name">${item.name}</span>
            <span class="leaderboard-score">${item.score}</span>
        </div>
    `).join('');
}

// ===== SETTINGS PANEL =====
const soundToggle = document.getElementById("sound-toggle");
const soundVolume = document.getElementById("sound-volume");
const volumeDisplay = document.getElementById("volume-display");
const clearDataBtn = document.getElementById("clear-data-btn");
const exportStatsBtn = document.getElementById("export-stats-btn");

soundToggle.checked = soundFx.enabled;
soundVolume.value = soundFx.volume;
volumeDisplay.textContent = soundFx.volume + "%";

soundToggle.addEventListener("change", (e) => {
    soundFx.toggle(e.target.checked);
    showToast(e.target.checked ? "🔊 Sound enabled" : "🔇 Sound disabled", "info");
});

soundVolume.addEventListener("input", (e) => {
    soundFx.setVolume(parseInt(e.target.value));
    volumeDisplay.textContent = e.target.value + "%";
});

clearDataBtn.onclick = () => {
    if (confirm("⚠️ Apakah Anda yakin ingin menghapus semua data?\n\nIni tidak bisa di-undo!")) {
        localStorage.clear();
        leaderboard.clear();
        userWins = 0;
        aiWins = 0;
        userWinsDisplay.textContent = "0";
        aiWinsDisplay.textContent = "0";
        updateProfileStats();
        showToast("🗑️ All data cleared!", "success");
    }
};

exportStatsBtn.onclick = () => {
    const stats = {
        name: displayName.textContent.replace("👤 ", ""),
        bio: currentBio,
        userWins: userWins,
        aiWins: aiWins,
        leaderboard: leaderboard.getScores(),
        exportDate: new Date().toLocaleString()
    };

    const dataStr = JSON.stringify(stats, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adam-stats-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast("📥 Stats exported!", "success");
};

// ===== PAGE NAVIGATION BUTTONS =====
const profileBtn = document.getElementById("profile-btn");
const settingsBtn = document.getElementById("settings-btn");

// DEBUG
console.log("Profile button:", profileBtn);
console.log("Settings button:", settingsBtn);

// Setup profile button with null check
if (profileBtn && profilePage) {
    profileBtn.onclick = () => {
        console.log("Profile button clicked!");
        home.classList.remove("active");
        lirik.classList.remove("active");
        profilePage.classList.add("active");
        settingsPage.classList.remove("active");
        if (gamesHubPage) gamesHubPage.classList.remove("active");
        if (analyticsPage) analyticsPage.classList.remove("active");
        closeSidebar();
        updateProfileStats();
        soundFx.playSound('whoosh');
    };
} else {
    console.error("Profile button or page not found!");
}

// Setup settings button with null check
if (settingsBtn && settingsPage) {
    settingsBtn.onclick = () => {
        console.log("Settings button clicked!");
        home.classList.remove("active");
        lirik.classList.remove("active");
        profilePage.classList.remove("active");
        settingsPage.classList.add("active");
        if (gamesHubPage) gamesHubPage.classList.remove("active");
        if (analyticsPage) analyticsPage.classList.remove("active");
        closeSidebar();
        soundFx.playSound('whoosh');
    };
} else {
    console.error("Settings button or page not found!");
}

document.getElementById("home-btn").onclick = () => {
    home.classList.add("active");
    lirik.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    closeSidebar();
    soundFx.playSound('whoosh');
};

document.getElementById("lirik-btn").onclick = () => {
    lirik.classList.add("active");
    home.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    closeSidebar();
    soundFx.playSound('whoosh');
};

// Games Hub navigation
const gamesHubBtnNav = document.getElementById("games-hub-btn-nav");
if (gamesHubBtnNav && gamesHubPage) {
    gamesHubBtnNav.onclick = () => {
        home.classList.remove("active");
        lirik.classList.remove("active");
        if (profilePage) profilePage.classList.remove("active");
        if (settingsPage) settingsPage.classList.remove("active");
        gamesHubPage.classList.add("active");
        if (analyticsPage) analyticsPage.classList.remove("active");
        closeSidebar();
        soundFx.playSound('whoosh');
    };
}

// Analytics navigation
const analyticsBtnNav = document.getElementById("analytics-btn");
if (analyticsBtnNav && analyticsPage) {
    analyticsBtnNav.onclick = () => {
        home.classList.remove("active");
        lirik.classList.remove("active");
        if (profilePage) profilePage.classList.remove("active");
        if (settingsPage) settingsPage.classList.remove("active");
        if (gamesHubPage) gamesHubPage.classList.remove("active");
        analyticsPage.classList.add("active");
        updateAnalytics();
        closeSidebar();
        soundFx.playSound('whoosh');
    };
}

// ===== INITIALIZE ON PAGE LOAD =====
updateProfileStats();
loadTheme();

// ===== THEME PRESETS (PHASE 2) =====
const themePresets = {
    ocean: { primary: "#0066ff", accent: "#00ccff", bg: "#001a4d" },
    sunset: { primary: "#ff6600", accent: "#ffcc00", bg: "#330000" },
    forest: { primary: "#00cc66", accent: "#00ff99", bg: "#001a00" },
    neon: { primary: "#ff00ff", accent: "#00ffff", bg: "#1a001a" },
    nirvana: { primary: "#00d4ff", accent: "#ff006e", bg: "#0a0a0a" }
};

document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.onclick = () => {
        const presetName = btn.dataset.preset;
        const preset = themePresets[presetName];
        applyTheme(preset);
        primaryColorInput.value = preset.primary;
        accentColorInput.value = preset.accent;
        bgColorInput.value = preset.bg;
        localStorage.setItem("customTheme", JSON.stringify(preset));
        showToast(`✨ Theme changed to ${presetName}!`, "success");
        soundFx.playSound('success');
    };
});

// ===== GAMES HUB (PHASE 2 & 3) =====
const gamesHubBtn = document.getElementById("games-hub-btn");

if (gamesHubBtn && gamesHubPage) {
    gamesHubBtn.onclick = () => {
        home.classList.remove("active");
        lirik.classList.remove("active");
        if (profilePage) profilePage.classList.remove("active");
        if (settingsPage) settingsPage.classList.remove("active");
        gamesHubPage.classList.add("active");
        closeSidebar();
        soundFx.playSound('whoosh');
    };
}

// ===== FLAPPY BIRD GAME (PHASE 2) =====
class FlappyBird {
    constructor() {
        this.canvas = document.getElementById('flappy-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.bird = { x: 50, y: 150, radius: 10, velocity: 0 };
        this.pipes = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('flappyBest') || 0;
        this.gameRunning = false;
        this.gravity = 0.6;
    }

    start() {
        this.bird = { x: 50, y: 150, radius: 10, velocity: 0 };
        this.pipes = [];
        this.score = 0;
        this.gameRunning = true;
        this.gameLoop();
    }

    gameLoop() {
        if (!this.gameRunning) return;

        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Bird physics
        this.bird.velocity += this.gravity;
        this.bird.y += this.bird.velocity;

        // Draw bird
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x, this.bird.y, this.bird.radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Generate pipes
        if (this.pipes.length === 0 || this.pipes[this.pipes.length - 1].x < 200) {
            const gap = 80;
            const topHeight = Math.random() * (this.canvas.height - gap - 100) + 50;
            this.pipes.push({ x: this.canvas.width, top: topHeight, bottom: topHeight + gap });
        }

        // Draw and update pipes
        this.pipes.forEach(pipe => {
            pipe.x -= 5;

            // Draw pipes
            this.ctx.fillStyle = '#00ff00';
            this.ctx.fillRect(pipe.x, 0, 40, pipe.top);
            this.ctx.fillRect(pipe.x, pipe.bottom, 40, this.canvas.height);

            // Collision
            if (this.bird.x + this.bird.radius > pipe.x &&
                this.bird.x - this.bird.radius < pipe.x + 40) {
                if (this.bird.y - this.bird.radius < pipe.top ||
                    this.bird.y + this.bird.radius > pipe.bottom) {
                    this.endGame();
                }
            }

            // Score
            if (pipe.x === this.bird.x) {
                this.score++;
                soundFx.playSound('success');
            }
        });

        // Remove off-screen pipes
        this.pipes = this.pipes.filter(p => p.x > -50);

        // Boundary check
        if (this.bird.y + this.bird.radius > this.canvas.height || this.bird.y - this.bird.radius < 0) {
            this.endGame();
        }

        // Update score display
        document.getElementById('flappy-current').textContent = this.score;

        requestAnimationFrame(() => this.gameLoop());
    }

    endGame() {
        this.gameRunning = false;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('flappyBest', this.bestScore);
            showToast(`🎉 New High Score: ${this.score}!`, "success");
        }
        document.getElementById('flappy-score').textContent = this.bestScore;
    }

    jump() {
        this.bird.velocity = -10;
    }
}

let flappyGame = new FlappyBird();

const playFlappyBtn = document.getElementById('play-flappy');
const flappyModal = document.getElementById('flappy-modal');
const startFlappyBtn = document.getElementById('start-flappy');
const closeFlappyBtn = document.getElementById('close-flappy');

if (playFlappyBtn && flappyModal) {
    playFlappyBtn.onclick = () => {
        flappyModal.classList.remove('hidden');
        flappyModal.classList.add('show');
        if (soundFx) soundFx.playSound('whoosh');
    };
}

if (startFlappyBtn) {
    startFlappyBtn.onclick = () => {
        flappyGame = new FlappyBird();
        flappyGame.start();
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && flappyGame.gameRunning) {
                e.preventDefault();
                flappyGame.jump();
            }
        });
        flappyModal.onclick = () => flappyGame.jump();
    };
}

if (closeFlappyBtn && flappyModal) {
    closeFlappyBtn.onclick = () => {
        flappyGame.gameRunning = false;
        flappyModal.classList.remove('show');
        flappyModal.classList.add('hidden');
    };
}

// ===== MEMORY GAME (PHASE 2) =====
class MemoryGame {
    constructor() {
        this.cards = ['🍎', '🍌', '🍊', '🍇', '🍎', '🍌', '🍊', '🍇'];
        this.shuffled = this.cards.sort(() => Math.random() - 0.5);
        this.flipped = [];
        this.matched = 0;
        this.moves = 0;
    }

    createGrid() {
        const grid = document.getElementById('memory-grid');
        grid.innerHTML = '';
        this.shuffled.forEach((card, i) => {
            const div = document.createElement('div');
            div.className = 'memory-card';
            div.textContent = '?';
            div.onclick = () => this.flip(i, div, card);
            grid.appendChild(div);
        });
    }

    flip(index, element, card) {
        if (this.flipped.length < 2 && !element.classList.contains('flipped')) {
            element.textContent = card;
            element.classList.add('flipped');
            this.flipped.push({ index, element, card });

            if (this.flipped.length === 2) {
                this.moves++;
                document.getElementById('memory-moves').textContent = this.moves;

                if (this.flipped[0].card === this.flipped[1].card) {
                    this.matched++;
                    document.getElementById('memory-matched').textContent = `${this.matched}/8`;
                    this.flipped = [];
                    soundFx.playSound('success');

                    if (this.matched === 4) {
                        showToast(`🎉 You Won in ${this.moves} moves!`, "success");
                    }
                } else {
                    setTimeout(() => {
                        this.flipped[0].element.textContent = '?';
                        this.flipped[1].element.textContent = '?';
                        this.flipped[0].element.classList.remove('flipped');
                        this.flipped[1].element.classList.remove('flipped');
                        this.flipped = [];
                    }, 600);
                }
            }
        }
    }
}

let memoryGame = new MemoryGame();
const playMemoryBtn = document.getElementById('play-memory');
const memoryModal = document.getElementById('memory-modal');
const startMemoryBtn = document.getElementById('start-memory');
const closeMemoryBtn = document.getElementById('close-memory');

if (playMemoryBtn && memoryModal) {
    playMemoryBtn.onclick = () => {
        memoryGame = new MemoryGame();
        memoryGame.createGrid();
        memoryModal.classList.remove('hidden');
        memoryModal.classList.add('show');
        if (soundFx) soundFx.playSound('whoosh');
    };
}

if (closeMemoryBtn && memoryModal) {
    closeMemoryBtn.onclick = () => {
        memoryModal.classList.remove('show');
        memoryModal.classList.add('hidden');
    };
}

// ===== TRIVIA GAME (PHASE 2) =====
const triviaQuestions = [
    { q: "JavaScript dibuat tahun berapa?", options: ["1995", "2000", "1990", "2005"], ans: 0 },
    { q: "HTML kepanjangan dari?", options: ["Hyper Text Markup Language", "High Tech Markup", "Home Tool", "Hyperlinks"], ans: 0 },
    { q: "CSS digunakan untuk?", options: ["Styling", "Logic", "Database", "Server"], ans: 0 },
    { q: "API kepanjangan dari?", options: ["Application Programming Interface", "Advanced Programming", "App Protocol", "All Programs"], ans: 0 },
    { q: "Database populer adalah?", options: ["MySQL", "MongoDB", "PostgreSQL", "Semua benar"], ans: 3 },
    { q: "Python dibuat oleh?", options: ["Guido van Rossum", "Mark Zuckerberg", "Dennis Ritchie", "Bjarne Stroustrup"], ans: 0 },
    { q: "DOM kepanjangan dari?", options: ["Document Object Model", "Data Operating Method", "Digital Object Module", "Database"], ans: 0 },
    { q: "REST API menggunakan method?", options: ["GET, POST, PUT, DELETE", "SELECT, INSERT", "READ, WRITE", "FETCH, SEND"], ans: 0 },
    { q: "Framework JavaScript populer?", options: ["React", "Vue", "Angular", "Semua benar"], ans: 3 },
    { q: "Git digunakan untuk?", options: ["Version Control", "Database", "Hosting", "Styling"], ans: 0 }
];

class TriviaGame {
    constructor() {
        this.current = 0;
        this.score = 0;
        this.questions = triviaQuestions;
    }

    displayQuestion() {
        const q = this.questions[this.current];
        document.getElementById('trivia-q').textContent = q.q;
        const opts = document.getElementById('trivia-options');
        opts.innerHTML = '';
        q.options.forEach((opt, i) => {
            const btn = document.createElement('button');
            btn.className = 'trivia-option';
            btn.textContent = opt;
            btn.onclick = () => this.answer(i);
            opts.appendChild(btn);
        });
    }

    answer(index) {
        if (index === this.questions[this.current].ans) {
            this.score++;
            soundFx.playSound('success');
        } else {
            soundFx.playSound('error');
        }
        this.current++;
        if (this.current < this.questions.length) {
            this.displayQuestion();
        } else {
            this.endGame();
        }
    }

    endGame() {
        document.getElementById('trivia-current').textContent = `${this.score}/10`;
        showToast(`Quiz selesai! Score: ${this.score}/10`, "success");
    }
}

let triviaGame = new TriviaGame();
const playTriviaBtn = document.getElementById('play-trivia');
const triviaModal = document.getElementById('trivia-modal');
const closeTriviaBtn = document.getElementById('close-trivia');

if (playTriviaBtn && triviaModal) {
    playTriviaBtn.onclick = () => {
        triviaGame = new TriviaGame();
        triviaGame.displayQuestion();
        triviaModal.classList.remove('hidden');
        triviaModal.classList.add('show');
        if (soundFx) soundFx.playSound('whoosh');
    };
}

if (closeTriviaBtn && triviaModal) {
    closeTriviaBtn.onclick = () => {
        triviaModal.classList.remove('show');
        triviaModal.classList.add('hidden');
    };
}

// ===== SNAKE GAME (PHASE 2) =====
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snake-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{ x: 150, y: 150 }];
        this.food = { x: 200, y: 200 };
        this.score = 0;
        this.gameRunning = false;
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
    }

    start() {
        this.gameRunning = true;
        this.gameLoop();
    }

    gameLoop() {
        if (!this.gameRunning) return;

        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.direction = this.nextDirection;
        const head = this.snake[0];
        const newHead = { x: head.x + this.direction.x * 10, y: head.y + this.direction.y * 10 };

        // Boundary
        if (newHead.x < 0 || newHead.x >= this.canvas.width || newHead.y < 0 || newHead.y >= this.canvas.height) {
            this.endGame();
            return;
        }

        // Self collision
        if (this.snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
            this.endGame();
            return;
        }

        this.snake.unshift(newHead);

        // Food
        if (newHead.x === this.food.x && newHead.y === this.food.y) {
            this.score++;
            this.food = { x: Math.floor(Math.random() * 30) * 10, y: Math.floor(Math.random() * 30) * 10 };
            soundFx.playSound('success');
        } else {
            this.snake.pop();
        }

        // Draw
        this.ctx.fillStyle = '#00ff00';
        this.snake.forEach(s => this.ctx.fillRect(s.x, s.y, 10, 10));

        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(this.food.x, this.food.y, 10, 10);

        document.getElementById('snake-current').textContent = this.score;

        setTimeout(() => this.gameLoop(), 100);
    }

    endGame() {
        this.gameRunning = false;
        showToast(`Game Over! Score: ${this.score}`, "info");
    }

    changeDirection(dx, dy) {
        if (this.direction.x === 0) this.nextDirection = { x: dx, y: dy };
        else if (this.direction.y === 0) this.nextDirection = { x: dx, y: dy };
    }
}

let snakeGame = new SnakeGame();
const playSnakeBtn = document.getElementById('play-snake');
const snakeModal = document.getElementById('snake-modal');
const startSnakeBtn = document.getElementById('start-snake');
const closeSnakeBtn = document.getElementById('close-snake');

if (playSnakeBtn && snakeModal) {
    playSnakeBtn.onclick = () => {
        snakeGame = new SnakeGame();
        snakeModal.classList.remove('hidden');
        snakeModal.classList.add('show');
        if (soundFx) soundFx.playSound('whoosh');
    };
}

if (startSnakeBtn) {
    startSnakeBtn.onclick = () => {
        snakeGame.start();
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') snakeGame.changeDirection(0, -1);
            if (e.key === 'ArrowDown') snakeGame.changeDirection(0, 1);
            if (e.key === 'ArrowLeft') snakeGame.changeDirection(-1, 0);
            if (e.key === 'ArrowRight') snakeGame.changeDirection(1, 0);
        });
    };
}

if (closeSnakeBtn && snakeModal) {
    closeSnakeBtn.onclick = () => {
        snakeGame.gameRunning = false;
        snakeModal.classList.remove('show');
        snakeModal.classList.add('hidden');
    };
}

// ===== ANALYTICS DASHBOARD (PHASE 3) =====
function updateAnalytics() {
    const flappyBest = localStorage.getItem('flappyBest') || 0;
    const memoryMoves = localStorage.getItem('memoryBest') || 0;
    const triviaBest = localStorage.getItem('triviaBest') || 0;
    const snakeBest = localStorage.getItem('snakeBest') || 0;

    // Safe element updates
    const safeUpdate = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    const totalGames = (userWins + aiWins) + (parseInt(flappyBest) + parseInt(memoryMoves) + parseInt(triviaBest) + parseInt(snakeBest));
    const miniGamesTotal = (parseInt(flappyBest) + parseInt(memoryMoves) + parseInt(triviaBest) + parseInt(snakeBest));

    safeUpdate('analytics-total-games', totalGames);
    safeUpdate('analytics-rps-wins', userWins);
    safeUpdate('analytics-minigames', miniGamesTotal);
    safeUpdate('analytics-flappy', flappyBest);
    safeUpdate('analytics-memory', memoryMoves);
    safeUpdate('analytics-trivia', triviaBest);
    safeUpdate('analytics-snake', snakeBest);

    // Achievements
    safeUpdate('ach-first', userWins > 0 ? '✅' : '❌');
    safeUpdate('ach-streak', userWins >= 5 ? '✅' : '❌');
    safeUpdate('ach-gamer', miniGamesTotal >= 10 ? '✅' : '❌');
}
