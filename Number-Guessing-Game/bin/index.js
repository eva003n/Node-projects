#! /usr/bin/env node

import { readFile, writeFile } from "fs/promises";
import path from "path";
import { stdin, stdout } from "process";
import { createInterface } from "readline/promises";
import { fileURLToPath } from "url";

// create prompting interface
const userInterface = createInterface({
  input: stdin,
  output: stdout,
});

let difficultyLevel;
const difficultyLevelOptions = new Map();

difficultyLevelOptions.set("Easy", { chances: 10 });
difficultyLevelOptions.set("Medium", { chances: 5 });
difficultyLevelOptions.set("Hard", { chances: 3 });

printWelcomeMessage();
chooseDifficultyLevel();

function printWelcomeMessage() {
  console.log(`
Welcome to the Number Guessing Game!
I'm thinking of a number between 1 and 100.
You have 5 chances to guess the correct number.
Please select the difficulty level:
1. Easy (10 chances)
2. Medium (5 chances)
3. Hard (3 chances)`);
}

// set difficulty level

async function chooseDifficultyLevel() {
  try {
    const difficultyLevelInt = await userInterface.question(
      "Enter your choice: "
    );
    const difficultyOptions = ["Easy", "Medium", "Hard"];

    if (difficultyLevelInt > difficultyOptions.length)
      throw new Error("Difficulty level must be either Easy, Medium or Hard");

    difficultyLevel = difficultyOptions[difficultyLevelInt - 1];
    console.log(`Great! You have selected the ${difficultyLevel} difficulty level.
Let's start the game!`);

    await startGame();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    // context switch to shell process
    userInterface.close();
  }
}

async function startGame() {
  // generate random integer number btw 1 - 100
  const randomNumber = Math.floor(Math.random() * (100 + 1));
    console.log(randomNumber);

  const totalChances = difficultyLevelOptions.get(difficultyLevel).chances;

  const startTime = Date.now();
  let chances = 1

  while( chances) {
    const guessedNumber = await userInterface.question("Enter your guess: ");

    // correct guess
    if (Number(guessedNumber) === randomNumber) {
       
      console.log(
        `Congratulations! You guessed the correct number in ${chances} attempts.`
      );
      console.log(
        `Took ${calculateTimeTakenSec(
          startTime,
          Date.now()
        )} seconds to guess answer`
      );
       await trackHighestScore(chances, difficultyLevel, totalChances);


      userInterface.close();
      break;
    }

    if (randomNumber > guessedNumber) {
      console.log(`Incorrect! The number is greater than ${guessedNumber}.`);
    } else {
      console.log(`Incorrect! The number is less than ${guessedNumber}.`);
    }

    // allow user to play multiple rounds
    const answer = await playAgainOrQuit(chances);

    if (answer === "no") {
    // play another round
        break;
    }

    chances++;
  }
  // context switch to shell process
  userInterface.close();
}

function calculateTimeTakenSec(startTime, endTime) {
  return (endTime - startTime) / 1000; // seconds
}

async function playAgainOrQuit() {
  const answer = await userInterface.question("Do you want to continue? ");

  return answer;
}

async function trackHighestScore(currentChances, level, totalChances) {
  try {
    const __fileName = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__fileName);
    // move out of bin folder into data folder
    const pathName = path.resolve(__dirname, "../data/score.json"); // absolute path

    let highestScorePerLevel = await readScore(pathName);

      const currentScore = totalChances;
    // fewests no of attempts
    if (currentChances < currentScore && currentChances < totalChances) {
      highestScorePerLevel[level.toLowerCase()] = {
        score: currentChances,
      };



      // update score in permanent storage
      await writeFile(pathName, JSON.stringify(highestScorePerLevel));

      if(Object.keys(highestScorePerLevel).length !== 0) {
      console.table(highestScorePerLevel);
      }

    }
  } catch (error) {
    console.error(`Error tracking highest score: ${error.message}`);
  }
}

async function readScore(pathName) {
    return JSON.parse((await readFile(pathName, {encoding: "utf-8"})) || JSON.stringify({}));
  
}
