#!/usr/bin/env node

import commandTable from "../src/commands.js";
import { showHelp } from "../src/handlers.js";

tokenizer();

function tokenizer() {
  try {
    const tokens = process.argv.slice(2);
    const parsedCommands = parser(tokens);
    dispatcher(parsedCommands);
    
  } catch (error) {
    console.error(`Error parsing command ${error.message}`);
  }
}

function parser(tokens) {
  if (Array.isArray(tokens) && tokens.length === 0) return showHelp();

  const parsedCommands = {
    command: tokens[0],
    // subCommands: null,
    flags: {},
  };

  // parse flags
  const flagsArray = tokens.slice(1);

  for (let i = 0; i < flagsArray.length; i++) {
    if (flagsArray[i].startsWith("--")) {
      const key = flagsArray[i].replace("--", "");
      const value = flagsArray[i + 1];
      parsedCommands.flags[key] = value;
    }
  }
  return parsedCommands;
}

async function dispatcher(parsed) {
  if (!commandTable.has(parsed?.command)) return showHelp();
  const handler = commandTable.get(parsed.command);

  try {
    await handler(parsed);
  } catch (error) {
    console.error(`Error dispatching command: ${error.message}`);
    console.error(error)
  }
}

process.on("uncaughtException", (err) => {
  console.error(`Uncaught exception ${err.message}`);
});