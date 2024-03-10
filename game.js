const readline = require('readline');

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

function checkWinnings(columns, lines, bet) {
  let winnings = 0;
  let winningLines = [];
  
  for (let line = 0; line < lines; line++) {
    const symbol = columns[0][line];
    if (columns.every(column => column[line] === symbol)) {
      winnings += SYMBOL_VALUE[symbol] * bet;
      winningLines.push(line + 1);
    }
  }

  return [winnings, winningLines];
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

function printSlotMachine(columns) {
  for (let row = 0; row < columns[0].length; row++) {
    let rowString = '';
    for (let i = 0; i < columns.length; i++) {
      rowString += columns[i][row] + ' | ';
    }
    console.log(rowString.slice(0, -2));
  }
}

async function deposit() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("What would you like to deposit? $", (amount) => {
      rl.close();
      const depositAmount = parseInt(amount);
      resolve(depositAmount);
    });
  });
}

async function getNumberOfLines() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("Enter the number of lines to bet on (1-3)? ", (lines) => {
      rl.close();
      const numberOfLines = parseInt(lines);
      if (numberOfLines >= 1 && numberOfLines <= 3) {
        resolve(numberOfLines);
      } else {
        console.log("Please enter a number between 1 and 3.");
        resolve(getNumberOfLines());
      }
    });
  });
}

async function getBet() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question("What would you like to bet on each line? $", (amount) => {
      rl.close();
      const betAmount = parseInt(amount);
      if (betAmount >= MIN_BET && betAmount <= MAX_BET) {
        resolve(betAmount);
      } else {
        console.log(`Please enter a bet amount between $${MIN_BET} and $${MAX_BET}.`);
        resolve(getBet());
      }
    });
  });
}

async function spin(balance) {
  const lines = await getNumberOfLines();
  const bet = await getBet();
  const totalBet = bet * lines;

  if (totalBet > balance) {
    console.log(`You do not have enough to bet that amount, your current balance is: $${balance}`);
    return 0;
  }

  console.log(`You are betting $${bet} on ${lines} lines. Total bet is equal to: $${totalBet}`);

  const slots = generateSlotMachineColumns(ROWS, COLS, SYMBOL_COUNT);
  printSlotMachine(slots);
  const [winnings, winningLines] = checkWinnings(slots, lines, bet);
  console.log(`You won $${winnings}.`);
  console.log("You won on lines:", ...winningLines);
  return winnings - totalBet;
}

async function main() {
  let balance = await deposit();
  while (true) {
    console.log(`Current balance is $${balance}`);
    if (balance === 0) {
      console.log("Your balance is 0. Please deposit a new amount.");
      balance = await deposit();
    }
    const answer = await getInput("Press enter to play (q to quit).");
    if (answer === "q") {
      break;
    }
    balance += await spin(balance);
  }

  console.log(`You left with $${balance}`);
  process.exit(0);
}

async function getInput(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      rl.close();
      resolve(input.trim());
    });
  });
}

main();
