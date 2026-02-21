// Design a command table

import { addExpense, deleteExpense, getAllExpenses, getSummaryExpenses, initializeExpenseTracker } from "./handlers.js";

const commandTable = new Map();

// add commands
commandTable.set("init", initializeExpenseTracker);
commandTable.set("add", addExpense);
commandTable.set("list", getAllExpenses);
commandTable.set("summary", getSummaryExpenses);
commandTable.set("delete", deleteExpense);

export default commandTable;
