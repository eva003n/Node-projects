import { fileURLToPath } from "url";
import path from "path";
import { readFile, access } from "fs/promises";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const articlesFile = path.resolve(__dirName, "../articles/data.json");

const months = [
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

function formatDate(date) {
  const dateObject = new Date(date);

  const day = dateObject.getDate();
  const month = dateObject.getMonth(); // zero based
  const year = dateObject.getFullYear();

  return `${months[month]} ${day}, ${year}`;
}

async function readData(file) {
  try {
    // check if file exists first
    await access(file || articlesFile);

    const data = await readFile(file || articlesFile, { encoding: "utf-8" });

    return data ? JSON.parse(data) : [];
  } catch (err) {
    // file doesnt exists return empty array
    if (err) return [];
  }
}

const getFilePath = (pathString) => {
  const __fileName = fileURLToPath(import.meta.url);
  const __dirName = path.dirname(__fileName);
  const filePath = path.resolve(__dirName, pathString);
  return filePath;
};
export { formatDate, readData, getFilePath };
