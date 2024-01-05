class RouletteBetting {
    constructor() {
        this.bets = [];
        this.houseProfit = 0;
    }

    placeBet(name, numbers, betAmount) {
        numbers = numbers.split(',').map(num => parseInt(num, 10));
        betAmount = parseInt(betAmount, 10);
        this.bets.push({ name, numbers, betAmount });
        this.updateCurrentBetsDisplay();
    }

    calculateWinnings(winningNumber) {
        winningNumber = parseInt(winningNumber, 10);

        // Adjust for the method that returns 37 instead of 0
        if (winningNumber === 37) {
            winningNumber = 0;
        }

        let totalPayout = 0;
        const winners = [];

        this.bets.forEach(bet => {
            const { name, numbers, betAmount } = bet;

            // Check for bets on first 12, second 12, third 12
            if (name === '1st12' && winningNumber >= 1 && winningNumber <= 12) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            } else if (name === '2nd12' && winningNumber >= 13 && winningNumber <= 24) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            } else if (name === '3rd12' && winningNumber >= 25 && winningNumber <= 36) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            }

            // Check for odd/even bets
            if (name === 'Odd' && winningNumber % 2 !== 0) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            } else if (name === 'Even' && winningNumber % 2 === 0) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            }

            // Check for specific number bets
            if (numbers.includes(winningNumber)) {
                const payoutRatio = this.getPayoutRatio(numbers.length);
                const winnings = betAmount * payoutRatio + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            }

            // Check for bets on red and black
            if (name === 'Red' && this.isRed(winningNumber)) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            } else if (name === 'Black' && !this.isRed(winningNumber)) {
                const winnings = betAmount * 2 + betAmount; // Include original bet
                winners.push({ name, winnings });
                totalPayout += winnings;
            }
        });

        this.houseProfit += (this.totalBetAmount() - totalPayout);
        this.bets = []; // Clear current bets
        this.updateWinningBetsDisplay(winners);
        this.updateHouseProfitDisplay();
        this.updateCurrentBetsDisplay(); // Clear display of current bets
    }

    getPayoutRatio(numNumbers) {
        switch(numNumbers) {
            case 1: return 35;
            case 2: return 17;
            case 3: return 11;
            case 4: return 8;
            default: return 0;
        }
    }

    totalBetAmount() {
        return this.bets.reduce((acc, bet) => acc + bet.betAmount, 0);
    }

    updateCurrentBetsDisplay() {
        const display = document.getElementById('currentBets');
        display.innerHTML = this.bets.map(bet => `${bet.name}: ${bet.numbers.join(', ')} - $${bet.betAmount}`).join('<br>');
    }

    updateWinningBetsDisplay(winners) {
        const display = document.getElementById('winningBets');
        display.innerHTML = winners.map(winner => `${winner.name} wins $${winner.winnings}`).join('<br>');
    }

    updateHouseProfitDisplay() {
        const display = document.getElementById('houseProfit');
        display.textContent = this.houseProfit;
    }
}

const roulette = new RouletteBetting();

function placeBet() {
    const betInputValue = document.getElementById('betInput').value;
    const [name, numbers, betAmount] = betInputValue.split(' ');
    roulette.placeBet(name, numbers, betAmount);
    document.getElementById('betInput').value = ''; // Clear input field
}

function calculateWinnings() {
    const winningNumber = document.getElementById('winInput').value;
    roulette.calculateWinnings(winningNumber);
    document.getElementById('winInput').value = ''; // Clear input field
}

function clearBets() {
    roulette.bets = [];
    roulette.updateCurrentBetsDisplay();
}
