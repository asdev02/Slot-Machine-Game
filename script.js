// JavaScript code

const MAX_BET = 100;
const MIN_BET = 1;
const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUE = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};

let balance = 0;

function deposit() {
    const depositAmount = prompt("Enter deposit amount:");
    const amount = parseInt(depositAmount);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        updateBalance();
    } else {
        alert("Please enter a valid deposit amount.");
    }
}

function updateBalance() {
    document.getElementById("balance").innerText = `Current balance: $${balance}`;
}

function spin() {
    const lines = prompt("Enter the number of lines to bet on (1-3):");
    const bet = prompt("Enter the bet amount on each line:");
    if (isNaN(lines) || isNaN(bet) || lines < 1 || lines > 3 || bet < MIN_BET || bet > MAX_BET) {
        alert("Invalid input. Please enter valid numbers.");
        return;
    }

    const totalBet = lines * bet;
    if (totalBet > balance) {
        alert("You do not have enough balance to place this bet.");
        return;
    }

    const slots = generateSlotMachineColumns(ROWS, COLS, SYMBOL_COUNT);
    displaySlotMachine(slots);
    const [winnings, winningLines] = checkWinnings(slots, lines, bet);
    const result = document.getElementById("result");
    if (winnings > 0) {
        result.innerText = `Congratulations! You won $${winnings}. Winning lines: ${winningLines.join(', ')}`;
        balance += winnings;
    } else {
        result.innerText = "Sorry, you didn't win this time. Try again!";
        balance -= totalBet;
    }
    updateBalance();
}

function generateSlotMachineColumns(rows, cols, symbols) {
    const allSymbols = [];
    for (const [symbol, symbolCount] of Object.entries(symbols)) {
        allSymbols.push(...Array(symbolCount).fill(symbol));
    }

    const columns = [];
    for (let i = 0; i < cols; i++) {
        const column = [];
        for (let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * allSymbols.length);
            column.push(allSymbols[randomIndex]);
        }
        columns.push(column);
    }

    return columns;
}

function displaySlotMachine(columns) {
    const slotMachine = document.getElementById("slot-machine");
    slotMachine.innerHTML = "";
    columns.forEach(column => {
        const columnDiv = document.createElement("div");
        columnDiv.classList.add("column");
        column.forEach(symbol => {
            const symbolDiv = document.createElement("div");
            symbolDiv.textContent = symbol;
            columnDiv.appendChild(symbolDiv);
        });
        slotMachine.appendChild(columnDiv);
    });
}

// Add an event listener to the Spin button
document.getElementById("spin-button").addEventListener("click", spin);
