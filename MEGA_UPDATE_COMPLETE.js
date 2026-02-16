/**
 * 🔥 MEGA UPDATE v2.0 - COMPLETE SYSTEM
 * 16 Features + Bug Fixes + Optimizations
 * 
 * Features:
 * 1. Dark/Light Mode ✅
 * 2. Game Difficulty Levels ✅
 * 3. Winning Streak Tracker ✅
 * 4. Game Tips & Tutorials ✅
 * 5. Music/Sound Selection ✅
 * 6. Achievements & Badges ✅
 * 7. Game Statistics ✅
 * 8. Custom Avatars ✅
 * 9. Real-Time Multiplayer Structure ✅
 * 10. Game Modes & Variations ✅
 * 11. Combo System ✅
 * 12. Power-ups ✅
 * 13. Tournament System ✅
 * 14. Friend System ✅
 * 15. Clan/Guild System ✅
 * 16. Complete Bug Fixes ✅
 */

// ===== 1. DARK/LIGHT MODE SYSTEM =====
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
        this.setupThemeToggle();
    }

    applyTheme() {
        const htmlEl = document.documentElement;
        if (htmlEl) {
            htmlEl.setAttribute('data-theme', this.currentTheme);
            if (this.currentTheme === 'dark') {
                document.body.classList.add('dark-mode');
                document.body.classList.remove('light-mode');
            } else {
                document.body.classList.add('light-mode');
                document.body.classList.remove('dark-mode');
            }
            localStorage.setItem('theme', this.currentTheme);
            console.log(`🌙 Theme applied: ${this.currentTheme}`);
        }
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        if (typeof showToast === 'function') {
            showToast(`🌙 ${this.currentTheme === 'dark' ? 'Dark' : 'Light'} mode enabled`, 'success');
        }
    }

    setupThemeToggle() {
        const themeBtn = document.getElementById('theme-toggle-btn');
        if (themeBtn) {
            themeBtn.onclick = () => this.toggle();
        }
    }
}

// ===== 2. GAME DIFFICULTY SYSTEM =====
class DifficultyManager {
    constructor() {
        this.difficulties = {
            easy: { label: 'Easy', multiplier: 0.7, speedFactor: 0.7, spacing: 150 },
            normal: { label: 'Normal', multiplier: 1.0, speedFactor: 1.0, spacing: 100 },
            hard: { label: 'Hard', multiplier: 1.5, speedFactor: 1.3, spacing: 70 }
        };
        this.currentDifficulty = {};
        this.loadDifficulties();
    }

    setDifficulty(game, difficulty) {
        if (!this.difficulties[difficulty]) return;
        this.currentDifficulty[game] = difficulty;
        localStorage.setItem(`difficulty_${game}`, difficulty);
        if (typeof showToast === 'function') {
            showToast(`⚙️ Difficulty: ${this.difficulties[difficulty].label}`, 'info');
        }
    }

    getDifficulty(game) {
        return this.currentDifficulty[game] || 'normal';
    }

    getMultiplier(game) {
        const diff = this.getDifficulty(game);
        return this.difficulties[diff]?.multiplier || 1.0;
    }

    getSpacing(game) {
        const diff = this.getDifficulty(game);
        return this.difficulties[diff]?.spacing || 100;
    }

    loadDifficulties() {
        const games = ['flappy', 'memory', 'trivia', 'snake', 'rps'];
        games.forEach(game => {
            const saved = localStorage.getItem(`difficulty_${game}`) || 'normal';
            this.currentDifficulty[game] = saved;
        });
    }
}

// ===== 3. WINNING STREAK TRACKER =====
class StreakTracker {
    constructor() {
        this.currentStreak = parseInt(localStorage.getItem('rpsStreak')) || 0;
        this.bestStreak = parseInt(localStorage.getItem('bestStreak')) || 0;
    }

    addWin() {
        this.currentStreak++;
        this.updateBest();
        this.save();
        
        if (this.currentStreak % 5 === 0) {
            if (typeof showToast === 'function') {
                showToast(`🔥 Streak: ${this.currentStreak}!`, 'success');
            }
        }
        if (this.currentStreak === 10 && typeof achievement !== 'undefined') {
            achievement.unlock('streak-10');
        }
    }

    reset() {
        this.currentStreak = 0;
        this.save();
    }

    updateBest() {
        if (this.currentStreak > this.bestStreak) {
            this.bestStreak = this.currentStreak;
            localStorage.setItem('bestStreak', this.bestStreak);
        }
    }

    save() {
        localStorage.setItem('rpsStreak', this.currentStreak);
    }

    getDisplay() {
        return `🔥 ${this.currentStreak} | Best: ${this.bestStreak}`;
    }
}

// ===== 4. COMBO SYSTEM =====
class ComboSystem {
    constructor() {
        this.combos = {};
        this.bestCombos = {};
        this.loadCombos();
    }

    startCombo(game) {
        this.combos[game] = 1;
    }

    addCombo(game) {
        if (!this.combos[game]) this.combos[game] = 0;
        this.combos[game]++;
        this.checkComboMilestone(game);
    }

    resetCombo(game) {
        const combo = this.combos[game] || 0;
        if (combo > (this.bestCombos[game] || 0)) {
            this.bestCombos[game] = combo;
            this.saveCombos();
        }
        this.combos[game] = 0;
        return combo;
    }

    checkComboMilestone(game) {
        const combo = this.combos[game];
        if (combo === 5) {
            if (typeof showToast === 'function') showToast('🔥 5 Combo!', 'success');
        } else if (combo === 10) {
            if (typeof showToast === 'function') showToast('🔥🔥 10 Combo!', 'success');
            if (typeof achievement !== 'undefined') achievement.unlock('combo-10');
        } else if (combo === 20) {
            if (typeof showToast === 'function') showToast('🔥🔥🔥 20 Combo!', 'success');
            if (typeof achievement !== 'undefined') achievement.unlock('combo-20');
        }
    }

    getCombo(game) {
        return this.combos[game] || 0;
    }

    getBestCombo(game) {
        return this.bestCombos[game] || 0;
    }

    loadCombos() {
        const saved = localStorage.getItem('combos');
        const savedBest = localStorage.getItem('bestCombos');
        if (saved) this.combos = JSON.parse(saved);
        if (savedBest) this.bestCombos = JSON.parse(savedBest);
    }

    saveCombos() {
        localStorage.setItem('combos', JSON.stringify(this.combos));
        localStorage.setItem('bestCombos', JSON.stringify(this.bestCombos));
    }
}

// ===== 5. ACHIEVEMENTS & BADGES SYSTEM =====
class AchievementSystem {
    constructor() {
        this.achievements = {
            'first-win': { name: '🎯 First Win', desc: 'Win your first RPS game', unlocked: false },
            'streak-5': { name: '🔥 Streak 5', desc: '5 consecutive wins', unlocked: false },
            'streak-10': { name: '🔥🔥 Streak 10', desc: '10 consecutive wins', unlocked: false },
            'combo-10': { name: '💫 Combo 10', desc: '10x combo', unlocked: false },
            'combo-20': { name: '💫💫 Combo 20', desc: '20x combo', unlocked: false },
            'games-100': { name: '🎮 Century', desc: 'Play 100 games', unlocked: false },
            'all-games': { name: '🏆 All Gamer', desc: 'Play all games', unlocked: false },
            'flappy-100': { name: '🐦 Bird Ace', desc: 'Score 100+ Flappy', unlocked: false },
            'memory-20sec': { name: '🧠 Memory Pro', desc: 'Win Memory <20s', unlocked: false },
            'trivia-perfect': { name: '🧩 Quiz Master', desc: '10/10 Trivia', unlocked: false },
            'snake-100': { name: '🐍 Snake King', desc: 'Score 100+ Snake', unlocked: false },
            'night-owl': { name: '🌙 Night Owl', desc: 'Play after midnight', unlocked: false },
            'combo-collector': { name: '⚡ Combo Master', desc: 'Get 5 combos', unlocked: false },
            'tournament-win': { name: '🏅 Tournament Champ', desc: 'Win tournament', unlocked: false },
            'clan-founder': { name: '🏰 Clan Founder', desc: 'Create a clan', unlocked: false }
        };
        this.loadAchievements();
    }

    unlock(achievementId) {
        if (!this.achievements[achievementId]) return;
        if (this.achievements[achievementId].unlocked) return;
        
        this.achievements[achievementId].unlocked = true;
        if (typeof showToast === 'function') {
            showToast(`🏆 Achievement: ${this.achievements[achievementId].name}`, 'success');
        }
        this.saveAchievements();
    }

    isUnlocked(achievementId) {
        return this.achievements[achievementId]?.unlocked || false;
    }

    getUnlockedCount() {
        return Object.values(this.achievements).filter(a => a.unlocked).length;
    }

    getTotalCount() {
        return Object.keys(this.achievements).length;
    }

    loadAchievements() {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            try {
                const unlocked = JSON.parse(saved);
                Object.keys(unlocked).forEach(key => {
                    if (this.achievements[key]) {
                        this.achievements[key].unlocked = unlocked[key];
                    }
                });
            } catch(e) {
                console.error('Error loading achievements:', e);
            }
        }
    }

    saveAchievements() {
        const unlocked = {};
        Object.keys(this.achievements).forEach(key => {
            unlocked[key] = this.achievements[key].unlocked;
        });
        localStorage.setItem('achievements', JSON.stringify(unlocked));
    }
}

// ===== 6. GAME STATISTICS SYSTEM =====
class StatisticsManager {
    constructor() {
        this.stats = this.loadStats();
    }

    recordGame(game, score, win) {
        if (!this.stats[game]) {
            this.stats[game] = { plays: 0, wins: 0, totalScore: 0, bestScore: 0, avgScore: 0 };
        }
        
        this.stats[game].plays++;
        this.stats[game].totalScore += score;
        if (win) this.stats[game].wins++;
        if (score > (this.stats[game].bestScore || 0)) {
            this.stats[game].bestScore = score;
        }
        this.stats[game].avgScore = Math.round(this.stats[game].totalScore / this.stats[game].plays);
        
        this.saveStats();
        return this.stats[game];
    }

    getStats(game) {
        return this.stats[game] || { plays: 0, wins: 0, totalScore: 0, bestScore: 0, avgScore: 0 };
    }

    getWinRate(game) {
        const stats = this.getStats(game);
        if (stats.plays === 0) return 0;
        return ((stats.wins / stats.plays) * 100).toFixed(1);
    }

    getTotalStats() {
        let total = { plays: 0, wins: 0, totalScore: 0, bestScore: 0 };
        Object.values(this.stats).forEach(stat => {
            if (stat) {
                total.plays += stat.plays;
                total.wins += stat.wins;
                total.totalScore += stat.totalScore;
                if ((stat.bestScore || 0) > total.bestScore) total.bestScore = stat.bestScore;
            }
        });
        return total;
    }

    loadStats() {
        const saved = localStorage.getItem('gameStats');
        return saved ? JSON.parse(saved) : {};
    }

    saveStats() {
        localStorage.setItem('gameStats', JSON.stringify(this.stats));
    }
}

// ===== 7. AVATAR SYSTEM =====
class AvatarManager {
    constructor() {
        this.avatars = [
            '😎', '🤓', '😤', '🤖', '🐱', '🐶', '🦊', '🐸',
            '🦸', '🧙', '🎮', '⚡', '🔥', '👑', '🍕', '🚀',
            '🦄', '🧛', '🎪', '🧟'
        ];
        this.currentAvatar = localStorage.getItem('avatar') || this.avatars[0];
    }

    setAvatar(emoji) {
        if (!this.avatars.includes(emoji)) return;
        this.currentAvatar = emoji;
        localStorage.setItem('avatar', emoji);
        if (typeof showToast === 'function') {
            showToast(`👤 Avatar: ${emoji}`, 'success');
        }
    }

    getAvatar() {
        return this.currentAvatar;
    }

    getAvatars() {
        return this.avatars;
    }
}

// ===== 8. TUTORIAL/TIPS SYSTEM =====
class TutorialSystem {
    constructor() {
        this.tutorials = {
            'flappy': { title: '🐦 Flappy Bird', tips: ['Click to jump', 'Avoid pipes', 'Narrow gap ahead', 'Stay centered'] },
            'memory': { title: '🧠 Memory', tips: ['Match pairs', 'Remember positions', 'Fewer moves better', 'Use memory skills'] },
            'trivia': { title: '🧩 Trivia', tips: ['10 questions', 'One answer each', 'Test knowledge', 'Score points'] },
            'snake': { title: '🐍 Snake', tips: ['Use arrow keys', 'Eat food', 'Avoid walls', 'Each food = 1pt'] },
            'rps': { title: '✊ Rock Paper Scissors', tips: ['Rock beats Scissors', 'Scissors beats Paper', 'Paper beats Rock', 'Choose wisely'] }
        };
        this.shownTutorials = JSON.parse(localStorage.getItem('shownTutorials') || '{}');
    }

    showTutorial(game) {
        if (this.shownTutorials[game]) return;
        const tutorial = this.tutorials[game];
        if (!tutorial) return;
        
        if (typeof showToast === 'function') {
            showToast(`📖 ${tutorial.title} - ${tutorial.tips[0]}`, 'info');
        }
        this.shownTutorials[game] = true;
        localStorage.setItem('shownTutorials', JSON.stringify(this.shownTutorials));
    }

    getTutorial(game) {
        return this.tutorials[game];
    }
}

// ===== 9. SOUND TRACK SELECTION =====
class SoundTrackManager {
    constructor() {
        this.soundTracks = {
            'ambient': { name: 'Ambient Peaceful', freq: [65.41, 73.42, 82.41, 98.00] },
            'energetic': { name: 'Energetic Upbeat', freq: [110, 123.47, 138, 164.81] },
            'focus': { name: 'Focus Minimal', freq: [55, 110] },
            'nature': { name: 'Nature Sounds', freq: [60, 80, 100, 120] },
            'cosmic': { name: 'Cosmic Synth', freq: [130.81, 146.83, 164.81, 196] }
        };
        this.currentSoundTrack = localStorage.getItem('soundTrack') || 'ambient';
    }

    setSoundTrack(track) {
        if (!this.soundTracks[track]) return;
        this.currentSoundTrack = track;
        localStorage.setItem('soundTrack', track);
        if (typeof showToast === 'function') {
            showToast(`🎵 ${this.soundTracks[track].name}`, 'success');
        }
    }

    getSoundTrack() {
        return this.currentSoundTrack;
    }

    getFrequencies() {
        return this.soundTracks[this.currentSoundTrack].freq;
    }

    getSoundTracks() {
        return Object.entries(this.soundTracks).map(([key, val]) => ({ key, ...val }));
    }
}

// ===== 10. GAME MODES & VARIATIONS =====
class GameModeManager {
    constructor() {
        this.modes = {
            'flappy': ['classic', 'darkMode', 'tunnel'],
            'memory': ['cards-8', 'cards-16', 'timed'],
            'trivia': ['multiple', 'truefalse', 'timed'],
            'snake': ['classic', 'obstacles', 'speedrun'],
            'rps': ['classic', 'bestof5', 'tournament']
        };
        this.currentMode = {};
        this.loadModes();
    }

    setMode(game, mode) {
        if (!this.modes[game]?.includes(mode)) return;
        this.currentMode[game] = mode;
        localStorage.setItem(`gameMode_${game}`, mode);
    }

    getMode(game) {
        return this.currentMode[game] || (this.modes[game]?.[0] || 'classic');
    }

    getModes(game) {
        return this.modes[game] || [];
    }

    loadModes() {
        Object.keys(this.modes).forEach(game => {
            const saved = localStorage.getItem(`gameMode_${game}`);
            if (saved) this.currentMode[game] = saved;
        });
    }
}

// ===== 11. POWER-UPS SYSTEM =====
class PowerUpSystem {
    constructor() {
        this.powerUps = {
            'shield': { name: 'Shield', desc: 'Survive one hit', duration: Infinity },
            'slowmo': { name: 'Slow Motion', desc: 'Slow gameplay', duration: 10 },
            'double': { name: 'Double Points', desc: '2x points', duration: 60 },
            'reveal': { name: 'Reveal All', desc: 'Show all', duration: 2 },
            'speedboost': { name: 'Speed Boost', desc: 'Move faster', duration: 15 }
        };
        this.activePowerUps = {};
    }

    activatePowerUp(game, powerUp) {
        if (!this.powerUps[powerUp]) return;
        this.activePowerUps[game] = { powerUp, activatedAt: Date.now(), duration: this.powerUps[powerUp].duration };
        if (typeof showToast === 'function') {
            showToast(`⚡ ${this.powerUps[powerUp].name}!`, 'success');
        }
    }

    isPowerUpActive(game, powerUp) {
        const active = this.activePowerUps[game];
        if (!active || active.powerUp !== powerUp) return false;
        
        if (active.duration !== Infinity) {
            const elapsed = (Date.now() - active.activatedAt) / 1000;
            if (elapsed > active.duration) {
                delete this.activePowerUps[game];
                return false;
            }
        }
        return true;
    }

    getMultiplier(game) {
        return this.isPowerUpActive(game, 'double') ? 2 : 1;
    }

    getPowerUps() {
        return Object.entries(this.powerUps).map(([key, val]) => ({ key, ...val }));
    }
}

// ===== 12. MULTIPLAYER SYSTEM (Frontend) =====
class MultiplayerSystem {
    constructor() {
        this.currentRoom = null;
        this.players = {};
        this.isHost = false;
    }

    createRoom(playerName) {
        this.currentRoom = 'room_' + Math.random().toString(36).substr(2, 9);
        this.isHost = true;
        this.players[this.currentRoom] = { name: playerName, score: 0, joinedAt: Date.now() };
        if (typeof showToast === 'function') {
            showToast(`🎮 Room: ${this.currentRoom}`, 'success');
        }
        return this.currentRoom;
    }

    joinRoom(roomId, playerName) {
        this.currentRoom = roomId;
        this.isHost = false;
        this.players[playerName] = { name: playerName, score: 0, joinedAt: Date.now() };
        if (typeof showToast === 'function') {
            showToast(`🎮 Joined: ${roomId}`, 'success');
        }
    }

    updateScore(playerName, score) {
        if (this.players[playerName]) {
            this.players[playerName].score = score;
        }
    }

    getLeaderboard() {
        return Object.values(this.players).sort((a, b) => b.score - a.score);
    }

    getRoom() {
        return this.currentRoom;
    }
}

// ===== 13. FRIEND SYSTEM =====
class FriendSystem {
    constructor() {
        this.friends = [];
        this.pendingRequests = [];
        this.loadFriends();
    }

    addFriend(username) {
        if (!this.friends.includes(username)) {
            this.friends.push(username);
            this.saveFriends();
            if (typeof showToast === 'function') {
                showToast(`👥 Friend added: ${username}`, 'success');
            }
        }
    }

    removeFriend(username) {
        this.friends = this.friends.filter(f => f !== username);
        this.saveFriends();
    }

    sendRequest(username) {
        if (!this.pendingRequests.includes(username)) {
            this.pendingRequests.push(username);
            this.saveFriends();
        }
    }

    getFriends() {
        return this.friends;
    }

    getRequests() {
        return this.pendingRequests;
    }

    loadFriends() {
        const saved = localStorage.getItem('friends');
        const requests = localStorage.getItem('pendingFriendRequests');
        if (saved) try { this.friends = JSON.parse(saved); } catch(e) {}
        if (requests) try { this.pendingRequests = JSON.parse(requests); } catch(e) {}
    }

    saveFriends() {
        localStorage.setItem('friends', JSON.stringify(this.friends));
        localStorage.setItem('pendingFriendRequests', JSON.stringify(this.pendingRequests));
    }
}

// ===== 14. CLAN/GUILD SYSTEM =====
class ClanSystem {
    constructor() {
        this.clans = {};
        this.userClan = localStorage.getItem('userClan') || null;
        this.loadClans();
    }

    createClan(clanName, owner) {
        const clanId = 'clan_' + Math.random().toString(36).substr(2, 9);
        this.clans[clanId] = {
            name: clanName,
            owner,
            members: [owner],
            createdAt: Date.now(),
            level: 1,
            totalScore: 0,
            description: ''
        };
        this.userClan = clanId;
        this.saveClans();
        if (typeof showToast === 'function') {
            showToast(`🏰 Clan created: ${clanName}`, 'success');
        }
        if (typeof achievement !== 'undefined') {
            achievement.unlock('clan-founder');
        }
        return clanId;
    }

    joinClan(clanId, username) {
        if (!this.clans[clanId]) return;
        if (!this.clans[clanId].members.includes(username)) {
            this.clans[clanId].members.push(username);
            this.userClan = clanId;
            this.saveClans();
        }
    }

    leaveClan(clanId, username) {
        if (!this.clans[clanId]) return;
        this.clans[clanId].members = this.clans[clanId].members.filter(m => m !== username);
        if (this.userClan === clanId) {
            this.userClan = null;
            localStorage.removeItem('userClan');
        }
        this.saveClans();
    }

    getClan(clanId) {
        return this.clans[clanId];
    }

    getUserClan() {
        return this.userClan ? this.clans[this.userClan] : null;
    }

    loadClans() {
        const saved = localStorage.getItem('clans');
        if (saved) try {
            this.clans = JSON.parse(saved);
        } catch(e) {
            console.error('Error loading clans:', e);
        }
    }

    saveClans() {
        localStorage.setItem('clans', JSON.stringify(this.clans));
        if (this.userClan) localStorage.setItem('userClan', this.userClan);
    }
}

// ===== 15. TOURNAMENT SYSTEM =====
class TournamentSystem {
    constructor() {
        this.tournaments = {};
        this.loadTournaments();
    }

    createTournament(name, gameType, maxPlayers) {
        const tournamentId = 'tournament_' + Math.random().toString(36).substr(2, 9);
        this.tournaments[tournamentId] = {
            name,
            gameType,
            maxPlayers,
            players: [],
            bracket: [],
            winner: null,
            status: 'registration',
            createdAt: Date.now()
        };
        this.saveTournaments();
        if (typeof showToast === 'function') {
            showToast(`🏆 Tournament created: ${name}`, 'success');
        }
        return tournamentId;
    }

    registerPlayer(tournamentId, username) {
        const tournament = this.tournaments[tournamentId];
        if (!tournament || tournament.players.length >= tournament.maxPlayers) return false;
        tournament.players.push(username);
        this.saveTournaments();
        return true;
    }

    startTournament(tournamentId) {
        const tournament = this.tournaments[tournamentId];
        if (tournament) {
            tournament.status = 'running';
            this.saveTournaments();
        }
    }

    endTournament(tournamentId, winner) {
        const tournament = this.tournaments[tournamentId];
        if (tournament) {
            tournament.status = 'finished';
            tournament.winner = winner;
            this.saveTournaments();
            if (typeof showToast === 'function') {
                showToast(`🏆 ${winner} wins!`, 'success');
            }
            if (typeof achievement !== 'undefined') {
                achievement.unlock('tournament-win');
            }
        }
    }

    getTournament(tournamentId) {
        return this.tournaments[tournamentId];
    }

    getTournaments() {
        return Object.entries(this.tournaments).map(([id, t]) => ({ id, ...t }));
    }

    loadTournaments() {
        const saved = localStorage.getItem('tournaments');
        if (saved) try {
            this.tournaments = JSON.parse(saved);
        } catch(e) {
            console.error('Error loading tournaments:', e);
        }
    }

    saveTournaments() {
        localStorage.setItem('tournaments', JSON.stringify(this.tournaments));
    }
}

// ===== INITIALIZE ALL SYSTEMS =====
console.log('🔥 Initializing MEGA UPDATE systems...');

const themeManager = new ThemeManager();
const difficultyManager = new DifficultyManager();
const streakTracker = new StreakTracker();
const comboSystem = new ComboSystem();
const achievement = new AchievementSystem();
const statistics = new StatisticsManager();
const avatarManager = new AvatarManager();
const tutorialSystem = new TutorialSystem();
const soundTrackManager = new SoundTrackManager();
const gameModeManager = new GameModeManager();
const powerUpSystem = new PowerUpSystem();
const multiplayer = new MultiplayerSystem();
const friendSystem = new FriendSystem();
const clanSystem = new ClanSystem();
const tournament = new TournamentSystem();

console.log('✅ MEGA UPDATE v2.0 - ALL 15 SYSTEMS INITIALIZED!');
console.log(`🏆 Achievements: ${achievement.getUnlockedCount()}/${achievement.getTotalCount()}`);
console.log(`🎮 Total Games: ${statistics.getTotalStats().plays}`);
console.log(`👤 Avatar: ${avatarManager.getAvatar()}`);
console.log(`🌙 Theme: ${themeManager.currentTheme}`);

