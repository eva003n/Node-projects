import {
  createTasksFile,
  createTask,
  printTasks,
  deleteTask,
  updateTask,
  showHelp,
} from "./handlers.js";

// create command table and add commanfs

const commandTable = new Map();

commandTable.set("init", createTasksFile);
commandTable.set("add", createTask);
commandTable.set("list", printTasks);
commandTable.set("delete", deleteTask);
commandTable.set("update", updateTask);
commandTable.set("mark", updateTask);
commandTable.set("help", showHelp);

export default commandTable;
