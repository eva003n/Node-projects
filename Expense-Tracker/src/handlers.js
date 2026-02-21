import path from "path";
import { fileURLToPath } from "url";
import { access, appendFile, readFile, writeFile } from "fs/promises";
import console from "console";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const dataFileLocation = path.resolve(__dirName, "./data/expenses.json");

const initializeExpenseTracker = async () => {
  try {
    // exit function early if the file already exists
    const fileExists = await checkFileExists(dataFileLocation);
    if (fileExists) {
      console.log("Reinitialized expense tracker");
      return;
    }
    // create file storage
    const failed = await appendFile(dataFileLocation, "");

    if (!failed) {
      console.log("Expense tracker initialized successfully");
    }
  } catch (error) {
    console.error(`Error initializing Expense tracker: ${error.message}`);
  }
};

async function checkFileExists(path) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}

async function readExpenseData() {
  const fileExists = await checkFileExists(dataFileLocation);
  if (!fileExists)
    throw new Error(
      "Expense tracker must be initialized, run expense-tracker init "
    );
  const expenses = await readFile(dataFileLocation, { encoding: "utf-8" });
  if (expenses) {
    return JSON.parse(expenses);
  }
}

const addExpense = async ({ flags }) => {
  try {
    const expenseData = (await readExpenseData()) || [];
    const lastExpense = expenseData[expenseData.length - 1];

    const isExistingExpense = expenseData.find(
      (expense) => expense.description === flags.description
    );

    if (isExistingExpense)
      throw new Error("Expense with same description already exists");

    const expense = {
      id: lastExpense ? id + 1 : 1,
      description: flags.description,
      amount: flags.amount,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expenseData.push(expense);
    await writeFile(dataFileLocation, JSON.stringify(expenseData));
    console.log(`Expense added successfully (ID: ${expense.id})`);
  } catch (error) {
    console.error(`Error adding expense: ${error.message}`);
  }
};

const updateExpense = async () => {};
const deleteExpense = async ({flags}) => {
    try {
        
        // delete element
        const expenses = await readExpenseData();
        if(!flags.id) throw new Error("Expense id is required")
        const isExpense = expenses.find(
          (expense) => expense.id === Number(flags.id)
        );

        if(!isExpense) throw new Error(`Expense with ID(${flags.id}) doesn't exist `);

        const newExpenses = expenses.filter(
          (expense) => expense.id !== Number(flags.id)
        );

        // persist chage in file storage
        await writeFile(dataFileLocation, JSON.stringify(newExpenses));

        console.log("Expense deleted successfully");

    } catch (error) {
        console.error(`Error deleting expense: ${error.message}`);
        
    }

};

const getAllExpenses = async () => {
  try {
    const expenses = (await readExpenseData()).map((expense) => {
      expense.amount = `$${expense.amount}`;
      return expense;
    });

    console.table(expenses, ["id", "createdAt", "description", "amount"]);
  } catch (error) {
    console.error(`Error listsing expenses: ${error.message}`);
  }
};

const getSummaryExpenses = async ({ flags }) => {
  try {
    let expenses = await readExpenseData();
    const month = flags.month ? Number(flags.month) - 1 : 0; // starts from 0

    if (flags.month) {
      expenses = expenses.filter((expense) => {
        if (new Date(expense.createdAt).getMonth() === month) {
          return expense;
        }
      });
    }

    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );

    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const message = flags.month
      ? `Total expenses for ${MONTHS[month]}: $${totalExpenses}`
      : `Total expenses: $${totalExpenses}`;

    console.log(message);
  } catch (error) {
    console.error(`Error while summarizing: ${error.message}`);
  }
};

const showHelp = () => {
    const helpText = `
Expense Tracker — Command Line Interface

Usage:
  expense-tracker <command> [options]

Commands:

  add       Add a new expense
    --description <text>   Description of the expense (required)
    --amount <number>      Expense amount (required)

    Example:
      expense-tracker add --description "Lunch" --amount 20
      # Expense added successfully (ID: 1)

  list      List all expenses

    Example:
      expense-tracker list
      # ID  Date        Description   Amount
      # 1   2024-08-06  Lunch         $20
      # 2   2024-08-06  Dinner        $10

  summary   Show total expenses
    --month <1-12>         Show totals for a specific month

    Examples:
      expense-tracker summary
      # Total expenses: $30

      expense-tracker summary --month 8
      # Total expenses for August: $20

  delete    Delete an expense by ID
    --id <number>

    Example:
      expense-tracker delete --id 2
      # Expense deleted successfully
`;

    console.log(helpText);
};

export {
  initializeExpenseTracker,
  addExpense,
  getAllExpenses,
  getSummaryExpenses,
  deleteExpense,
  showHelp,
};
