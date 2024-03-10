Slot Machine Game

This is a command-line slot machine game written in JavaScript using Node.js.

Features

Play a classic 3x3 slot machine game.
Bet on up to 3 lines.
Win based on matching symbols and their corresponding values.
Getting Started

Clone this repository to your local machine.
Install Node.js and npm (or yarn) if you haven't already.
Open a terminal in the project directory and run npm install (or yarn install) to install the required dependencies.
Run the game using node index.js.
How to Play

The game will prompt you to enter a deposit amount.
After depositing, you can choose the number of lines to bet on (1-3) and the bet amount per line ($1-$100).
The game will spin the reels and display the results.
You will win based on matching symbols and their corresponding values.
You can continue playing until you run out of money or quit the game by pressing "q".
Code Structure

The code is organized into several functions:

deposit: Prompts the user for a deposit amount.
getNumberOfLines: Prompts the user for the number of lines to bet on.
getBet: Prompts the user for the bet amount per line.
spin: Handles a single spin of the slot machine.
generateSlotMachineColumns: Generates the random symbols for the reels.
printSlotMachine: Prints the current state of the slot machine to the console.
checkWinnings: Checks for winning lines based on the symbols and bet amount.
main: The main function that starts the game loop.