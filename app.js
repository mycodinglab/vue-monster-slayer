function getRandonValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: [],
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        },
    },

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //Draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //Player lost
                this.winner = 'monster';
            }
        },

        monsterHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                //Draw
                this.winner = 'draw';
            } else if (value <= 0) {
                //Monster lost
                this.winner = 'player';
            }
        },
    },

    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandonValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandonValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster', 'attack', attackValue);

        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandonValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player', 'special-attack', attackValue);

            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            healValue = getRandonValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessages('player', 'heal', healValue);

            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessages(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount('#game');