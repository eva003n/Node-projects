import { randomUUID } from "crypto";
import { appendFile, readFile, writeFile } from "fs/promises";
import path from "path";
import CLIError from "../utils/CliError.js";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);


// const currentWorkingDir = process.cwd(); // using this depends on where y run node which is not good for global cli apps
const tasksFileLocation = path.resolve(__dirName, "../data/tasks.json");// move out of bin into data folder

// console.log(tasksFileLocation)

// read data from file and initialize the tasks at runtime
const readTasks = async () => {
  try {
    const data = await readFile(tasksFileLocation, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(
        "❌ Cannot run any other command before intializing tasktrac, run tasktrac init"
      );
    } else {
      console.error(`Error reading file: ${error.message}`);
    }
    process.exit(1);
  }
};

const tasks = (await readTasks()) || [];

const createTasksFile = async () => {
  try {
    const failed = await appendFile(tasksFileLocation, "");

    if (!failed) {
      console.log(`✅ Successfully created task file: ${tasksFileLocation}`);
      process.exit(0);
    }
  } catch (error) {
    console.error(`Error creating task.json file: ${error.message}`);
    process.exit(1);
  }
};

const createTask = async ({ subCommands }) => {
  if (!Array.isArray(subCommands)) return;

  try {
    const subCommand = subCommands[0];
    // prevent adding duplicate tasks
    const isExistingtask = tasks.find(
      (taskItem) => taskItem.description === subCommand
    );

    if (isExistingtask) {
      throw new CLIError("Task with the same decription already exists");
    }

    const task = {
      id: randomUUID(),
      description: subCommand,
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // add task to temporal storage
    tasks.push(task);

    // save the task to permenent
    const failed = await writeFile(tasksFileLocation, JSON.stringify(tasks));

    // successful storage to file
    if (!failed) {
      console.log(`✅ Task added successfully (ID: ${task.id})`);
      process.exit(0);
    }
  } catch (error) {
    console.error(`❌ Error creating task: ${error.message}`);
    process.exit(1);
  }
};

const updateTask = async ({ command, subCommands }) => {
  if (!Array.isArray(subCommands)) return;
  let matchingTask;
  try {
    if (command === "update") {
      matchingTask = tasks.find((taskItem) => taskItem.id === subCommands[0]);

      if (!matchingTask)
        throw new CLIError(`Task ID(${subCommands[0]}) doesn't exist`);

      // update description
      matchingTask.description = subCommands[1];
    } else {
      // update task status
      matchingTask = tasks.find(
        (taskItem) => taskItem.id === subCommands[1] // search by id
      );

      if (!matchingTask)
        throw new CLIError(`Task ID(${subCommands[1]}) doesn't exist`);

      matchingTask.status = subCommands[0]; // update status in-progress, done
    }

    // update task in storage"
    const failed = await writeFile(tasksFileLocation, JSON.stringify(tasks));

    if (!failed) {
      console.log(`✅ Task updated successfully (ID: ${matchingTask.id})`);
    }
  } catch (error) {
    console.error(`❌ Error updating task: ${error.message}`);
  }
};
const printTasks = ({ subCommands }) => {
  if (!Array.isArray(subCommands)) return;

  try {
    if (subCommands[0]) {
      console.dir(tasks.filter((taskItem) => taskItem.status === subCommands[0]));
    }  else {
      console.dir(tasks);
    }

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error listing todos: ${error.messAGE}`);
    process.exit(1);
  }
};

const deleteTask = async ({ subCommands }) => {
  if (!Array.isArray(subCommands)) return;

  try {
    const isExistingTask = tasks.find(
      (taskItem) => taskItem.id === subCommands[0]
    );

    if (!isExistingTask)
      throw new CLIError(`Task ID(${subCommands[0]}) doesn't exist`);

    // create a new array without the existing task
    const newTasks = tasks.filter((taskItem) => taskItem.id !== subCommands[0]);

    await writeFile(tasksFileLocation, JSON.stringify(newTasks));

    console.log(`✅ Task deleted successfully (ID: ${isExistingTask.id})`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Error deleting task: ${error.message}`);
    process.exit(1);
  }
};

const showHelp = () => {
  console.log(`
Task CLI — Simple Task Manager

Usage:
  task-cli <command> [options]

Commands:

  add "<task description>"
      Add a new task.
      Example: task-cli add "Buy groceries"

  update <id> "<new description>"
      Update an existing task.
      Example: task-cli update 1 "Buy groceries and cook dinner"

  delete <id>
      Delete a task by ID.
      Example: task-cli delete 1

  mark-in-progress <id>
      Mark a task as in progress.
      Example: task-cli mark-in-progress 1

  mark-done <id>
      Mark a task as done.
      Example: task-cli mark-done 1

  list
      List all tasks.

  list <status>
      List tasks by status (todo | in-progress | done).
flags:
  --help
      - show various CLI commands

Tips:
  - IDs are assigned automatically.
  - Use quotes for multi-word descriptions.
`);
}


export {
  readTasks,
  createTasksFile,
  createTask,
  updateTask,
  printTasks,
  deleteTask,
  showHelp
};
