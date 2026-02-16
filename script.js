// ===== SIDEBAR NAVIGATION =====
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
let isFocusMode = false;

menuBtn.onclick = () => {
    if (isFocusMode) {
        exitFocusMode();
    } else {
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
const tournamentPage = document.getElementById("tournament-page");
const friendPage = document.getElementById("friend-page");
const clanPage = document.getElementById("clan-page");

console.log("Page variables loaded");

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.style.display = "none";
}

function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin: 10px;
        animation: slideIn 0.3s;
    `;
    
    container.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

// ===== CREATOR & ENEMY BUTTONS FIX =====
const creatorBtn = document.getElementById("creator-btn");
const enemyBtn = document.getElementById("enemy-btn");
const creatorName = document.getElementById("creator-name");
const enemyName = document.getElementById("enemy-name");

if (creatorBtn) {
    creatorBtn.onclick = () => {
        if (creatorName.classList.contains("hidden")) {
            creatorName.classList.remove("hidden");
            creatorBtn.textContent = "Sembunyikan Pembuat";
            enemyName.classList.add("hidden");
            if (enemyBtn) enemyBtn.textContent = "⚔️ Musuh Pembuat";
            showToast("👤 Adam Ganteng muncul!", "success");
        } else {
            creatorName.classList.add("hidden");
            creatorBtn.textContent = "Lihat Pembuat Website";
            showToast("👤 Adam Ganteng disembunyikan", "info");
        }
    };
}

if (enemyBtn) {
    enemyBtn.onclick = () => {
        if (enemyName.classList.contains("hidden")) {
            enemyName.classList.remove("hidden");
            enemyBtn.textContent = "Sembunyikan Musuh";
            creatorName.classList.add("hidden");
            if (creatorBtn) creatorBtn.textContent = "Lihat Pembuat Website";
            showToast("😈 Musuh muncul!", "success");
        } else {
            enemyName.classList.add("hidden");
            enemyBtn.textContent = "⚔️ Musuh Pembuat";
            showToast("😈 Musuh disembunyikan", "info");
        }
    };
}

// ===== NAVIGATION BUTTONS =====
document.getElementById("home-btn").onclick = () => {
    home.classList.add("active");
    lirik.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    if (tournamentPage) tournamentPage.classList.remove("active");
    if (friendPage) friendPage.classList.remove("active");
    if (clanPage) clanPage.classList.remove("active");
    closeSidebar();
};

document.getElementById("lirik-btn").onclick = () => {
    lirik.classList.add("active");
    home.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    if (tournamentPage) tournamentPage.classList.remove("active");
    if (friendPage) friendPage.classList.remove("active");
    if (clanPage) clanPage.classList.remove("active");
    closeSidebar();
};

document.getElementById("games-hub-btn-nav").onclick = () => {
    if (gamesHubPage) gamesHubPage.classList.add("active");
    home.classList.remove("active");
    lirik.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    if (tournamentPage) tournamentPage.classList.remove("active");
    if (friendPage) friendPage.classList.remove("active");
    if (clanPage) clanPage.classList.remove("active");
    closeSidebar();
};

document.getElementById("analytics-btn").onclick = () => {
    if (analyticsPage) analyticsPage.classList.add("active");
    home.classList.remove("active");
    lirik.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (tournamentPage) tournamentPage.classList.remove("active");
    if (friendPage) friendPage.classList.remove("active");
    if (clanPage) clanPage.classList.remove("active");
    closeSidebar();
};

document.getElementById("profile-btn").onclick = () => {
    if (profilePage) profilePage.classList.add("active");
    home.classList.remove("active");
    lirik.classList.remove("active");
    if (settingsPage) settingsPage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    if (tournamentPage) tournamentPage.classList.remove("active");
    if (friendPage) friendPage.classList.remove("active");
    if (clanPage) clanPage.classList.remove("active");
    closeSidebar();
};

document.getElementById("settings-btn").onclick = () => {
    if (settingsPage) settingsPage.classList.add("active");
    home.classList.remove("active");
    lirik.classList.remove("active");
    if (profilePage) profilePage.classList.remove("active");
    if (gamesHubPage) gamesHubPage.classList.remove("active");
    if (analyticsPage) analyticsPage.classList.remove("active");
    if (tournamentPage) tournamentPage.classList.remove("active");
    if (friendPage) friendPage.classList.remove("active");
    if (clanPage) clanPage.classList.remove("active");
    closeSidebar();
};

const tournamentBtn = document.getElementById("tournament-btn");
if (tournamentBtn) {
    tournamentBtn.onclick = () => {
        if (tournamentPage) tournamentPage.classList.add("active");
        home.classList.remove("active");
        lirik.classList.remove("active");
        if (profilePage) profilePage.classList.remove("active");
        if (settingsPage) settingsPage.classList.remove("active");
        if (gamesHubPage) gamesHubPage.classList.remove("active");
        if (analyticsPage) analyticsPage.classList.remove("active");
        if (friendPage) friendPage.classList.remove("active");
        if (clanPage) clanPage.classList.remove("active");
        closeSidebar();
    };
}

const friendBtn = document.getElementById("friend-btn");
if (friendBtn) {
    friendBtn.onclick = () => {
        if (friendPage) friendPage.classList.add("active");
        home.classList.remove("active");
        lirik.classList.remove("active");
        if (profilePage) profilePage.classList.remove("active");
        if (settingsPage) settingsPage.classList.remove("active");
        if (gamesHubPage) gamesHubPage.classList.remove("active");
        if (analyticsPage) analyticsPage.classList.remove("active");
        if (tournamentPage) tournamentPage.classList.remove("active");
        if (clanPage) clanPage.classList.remove("active");
        closeSidebar();
    };
}

const clanBtn = document.getElementById("clan-btn");
if (clanBtn) {
    clanBtn.onclick = () => {
        if (clanPage) clanPage.classList.add("active");
        home.classList.remove("active");
        lirik.classList.remove("active");
        if (profilePage) profilePage.classList.remove("active");
        if (settingsPage) settingsPage.classList.remove("active");
        if (gamesHubPage) gamesHubPage.classList.remove("active");
        if (analyticsPage) analyticsPage.classList.remove("active");
        if (tournamentPage) tournamentPage.classList.remove("active");
        if (friendPage) friendPage.classList.remove("active");
        closeSidebar();
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

if (userWinsDisplay) userWinsDisplay.textContent = userWins;
if (aiWinsDisplay) aiWinsDisplay.textContent = aiWins;

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
            if (userWinsDisplay) userWinsDisplay.textContent = userWins;
            localStorage.setItem("rpsUserWins", userWins);
        } else {
            result = `${emojiUser} vs ${emojiAi} - AI menang! 🤖`;
            aiWins++;
            if (aiWinsDisplay) aiWinsDisplay.textContent = aiWins;
            localStorage.setItem("rpsAiWins", aiWins);
        }
        
        if (gameResult) {
            gameResult.textContent = result;
            gameResult.classList.add("show-result");
            setTimeout(() => {
                gameResult.classList.remove("show-result");
            }, 3000);
        }
    };
});

if (resetGameBtn) {
    resetGameBtn.onclick = () => {
        userWins = 0;
        aiWins = 0;
        if (userWinsDisplay) userWinsDisplay.textContent = "0";
        if (aiWinsDisplay) aiWinsDisplay.textContent = "0";
        if (gameResult) gameResult.textContent = "";
        localStorage.removeItem("rpsUserWins");
        localStorage.removeItem("rpsAiWins");
    };
}

// ===== CALCULATOR =====
let calculatorDisplay = document.getElementById("display");
let history = [];

document.querySelectorAll(".btn-calc").forEach(btn => {
    btn.onclick = () => {
        const value = btn.textContent;
        
        if (value === "=") {
            try {
                let result = eval(calculatorDisplay.value);
                history.push(calculatorDisplay.value + " = " + result);
                calculatorDisplay.value = result;
                updateHistory();
            } catch {
                calculatorDisplay.value = "Error";
            }
        } else if (value === "C") {
            calculatorDisplay.value = "0";
        } else {
            if (calculatorDisplay.value === "0") {
                calculatorDisplay.value = value;
            } else {
                calculatorDisplay.value += value;
            }
        }
    };
});

function updateHistory() {
    const historyList = document.getElementById("history-list");
    if (!historyList) return;
    historyList.innerHTML = history.map((h, i) => `<li>${h}</li>`).join("");
}

// ===== MAGIC SHELL =====
const kerangAnswers = [
    "Ya, tentu! 😄",
    "Tidak, sama sekali! 😑",
    "Mungkin... 🤔",
    "Entahlah! 🤷",
    "Percaya tidak percaya, iyalah! 😂"
];

const kerangBtn = document.getElementById("kerang-btn");
if (kerangBtn) {
    kerangBtn.onclick = () => {
        const randomAnswer = kerangAnswers[Math.floor(Math.random() * kerangAnswers.length)];
        const kerangJawab = document.getElementById("kerang-jawab");
        if (kerangJawab) {
            kerangJawab.textContent = randomAnswer;
            kerangJawab.classList.add("show-answer");
            setTimeout(() => {
                kerangJawab.classList.remove("show-answer");
            }, 2000);
        }
    };
}

// ===== QUOTE GENERATOR =====
const quotes = [
    "Come as you are - Nirvana",
    "You only live once - Life",
    "The only way out is through - Nirvana",
    "Something in the way - Nirvana",
    "Smells like teen spirit - Nirvana"
];

const newQuoteBtn = document.getElementById("new-quote-btn");
const copyQuoteBtn = document.getElementById("copy-quote-btn");
const quoteText = document.getElementById("quote-text");

if (newQuoteBtn) {
    newQuoteBtn.onclick = () => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        if (quoteText) quoteText.textContent = randomQuote;
    };
}

if (copyQuoteBtn) {
    copyQuoteBtn.onclick = () => {
        if (quoteText && quoteText.textContent) {
            navigator.clipboard.writeText(quoteText.textContent);
            showToast("✅ Quote copied!", "success");
        }
    };
}

// ===== THEME PRESETS =====
const presetBtns = document.querySelectorAll(".preset-btn");
presetBtns.forEach(btn => {
    btn.onclick = () => {
        const preset = btn.dataset.preset;
        const colors = {
            ocean: { primary: "#0066cc", secondary: "#00ccff" },
            sunset: { primary: "#ff6600", secondary: "#ffcc00" },
            forest: { primary: "#00cc66", secondary: "#006633" },
            neon: { primary: "#ff00ff", secondary: "#00ffff" },
            nirvana: { primary: "#00d4ff", secondary: "#ff006e" }
        };
        
        const color = colors[preset];
        if (color) {
            document.documentElement.style.setProperty("--primary-color", color.primary);
            document.documentElement.style.setProperty("--secondary-color", color.secondary);
            showToast(`🎨 Theme: ${preset}`, "success");
        }
    };
});

// ===== COLOR CUSTOMIZER INPUTS (FIX) =====
const primaryColorInput = document.getElementById("primary-color");
const accentColorInput = document.getElementById("accent-color");
const bgColorInput = document.getElementById("bg-color");
const resetThemeBtn = document.getElementById("reset-theme-btn");

if (primaryColorInput) {
    primaryColorInput.oninput = (e) => {
        document.documentElement.style.setProperty("--primary-color", e.target.value);
        localStorage.setItem("customPrimaryColor", e.target.value);
        showToast(`🎨 Primary color changed`, "success");
    };
}

if (accentColorInput) {
    accentColorInput.oninput = (e) => {
        document.documentElement.style.setProperty("--accent-color", e.target.value);
        localStorage.setItem("customAccentColor", e.target.value);
        showToast(`🎨 Accent color changed`, "success");
    };
}

if (bgColorInput) {
    bgColorInput.oninput = (e) => {
        document.documentElement.style.setProperty("--bg-color", e.target.value);
        localStorage.setItem("customBgColor", e.target.value);
        showToast(`🎨 Background color changed`, "success");
    };
}

if (resetThemeBtn) {
    resetThemeBtn.onclick = () => {
        // Reset to defaults
        document.documentElement.style.setProperty("--primary-color", "#00d4ff");
        document.documentElement.style.setProperty("--accent-color", "#ff006e");
        document.documentElement.style.setProperty("--bg-color", "#0a0a0a");
        
        // Reset inputs
        if (primaryColorInput) primaryColorInput.value = "#00d4ff";
        if (accentColorInput) accentColorInput.value = "#ff006e";
        if (bgColorInput) bgColorInput.value = "#0a0a0a";
        
        // Clear localStorage
        localStorage.removeItem("customPrimaryColor");
        localStorage.removeItem("customAccentColor");
        localStorage.removeItem("customBgColor");
        
        showToast(`🎨 Theme reset to default`, "success");
    };
}

// Restore custom colors from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedPrimary = localStorage.getItem("customPrimaryColor");
    const savedAccent = localStorage.getItem("customAccentColor");
    const savedBg = localStorage.getItem("customBgColor");
    
    if (savedPrimary) {
        document.documentElement.style.setProperty("--primary-color", savedPrimary);
        if (primaryColorInput) primaryColorInput.value = savedPrimary;
    }
    if (savedAccent) {
        document.documentElement.style.setProperty("--accent-color", savedAccent);
        if (accentColorInput) accentColorInput.value = savedAccent;
    }
    if (savedBg) {
        document.documentElement.style.setProperty("--bg-color", savedBg);
        if (bgColorInput) bgColorInput.value = savedBg;
    }
});

// ===== GAME SYSTEMS (BASIC) =====
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
    }
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        showToast(`🌙 ${this.currentTheme} mode`, 'success');
    }
}

class FriendSystem {
    constructor() {
        this.friends = [];
        this.loadFriends();
    }
    addFriend(username) {
        if (!this.friends.includes(username)) {
            this.friends.push(username);
            this.saveFriends();
        }
    }
    removeFriend(username) {
        this.friends = this.friends.filter(f => f !== username);
        this.saveFriends();
    }
    getFriends() {
        return this.friends;
    }
    loadFriends() {
        const saved = localStorage.getItem('friends');
        if (saved) {
            try { this.friends = JSON.parse(saved); } catch(e) {}
        }
    }
    saveFriends() {
        localStorage.setItem('friends', JSON.stringify(this.friends));
    }
}

class ClanSystem {
    constructor() {
        this.clans = {};
        this.userClan = localStorage.getItem('userClan') || null;
        this.loadClans();
    }
    createClan(name, owner) {
        const clanId = 'clan_' + Math.random().toString(36).substr(2, 9);
        this.clans[clanId] = {
            name: name,
            owner: owner,
            members: [owner],
            level: 1,
            totalScore: 0
        };
        this.userClan = clanId;
        this.saveClans();
        return clanId;
    }
    getUserClan() {
        return this.userClan ? this.clans[this.userClan] : null;
    }
    loadClans() {
        const saved = localStorage.getItem('clans');
        if (saved) {
            try { this.clans = JSON.parse(saved); } catch(e) {}
        }
    }
    saveClans() {
        localStorage.setItem('clans', JSON.stringify(this.clans));
    }
}

class TournamentSystem {
    constructor() {
        this.tournaments = {};
        this.loadTournaments();
    }
    createTournament(name, gameType, maxPlayers) {
        const id = 'tournament_' + Math.random().toString(36).substr(2, 9);
        this.tournaments[id] = {
            name: name,
            gameType: gameType,
            maxPlayers: maxPlayers,
            players: [],
            status: 'registration',
            createdAt: Date.now()
        };
        this.saveTournaments();
        return id;
    }
    getTournaments() {
        return Object.entries(this.tournaments).map(([id, t]) => ({ id, ...t }));
    }
    loadTournaments() {
        const saved = localStorage.getItem('tournaments');
        if (saved) {
            try { this.tournaments = JSON.parse(saved); } catch(e) {}
        }
    }
    saveTournaments() {
        localStorage.setItem('tournaments', JSON.stringify(this.tournaments));
    }
}

// ===== INITIALIZE SYSTEMS =====
window.themeManager = new ThemeManager();
window.friendSystem = new FriendSystem();
window.clanSystem = new ClanSystem();
window.tournament = new TournamentSystem();

console.log("✅ All systems initialized!");

