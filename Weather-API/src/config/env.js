import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

config({
  path: path.resolve(__dirName, "../../.env"),
});

export const { PORT, API_KEY } = process.env;
