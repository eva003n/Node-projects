import path from "path";
import { fileURLToPath } from "url";
import { appendFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import { formatDate, readArticleData } from "../../utils/index.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const articlesFolder = path.resolve(__dirName, "../../articles");

function createArticlePage(req, res) {
  res.render("createarticle", {});
}

async function createArticle(req, res) {
  try {
    const { title, date, content } = req.body;

    // check if article exist before creating to avoid duplicates
    const articles = await readArticleData();

    const isArticle = articles.find((article) => article.title === title);

    if (isArticle) {
        return res.status(409).send("Article with same name already exists");
    }

    // create article
    const article = {
      id: randomUUID(),
      title,
      date: formatDate(date),
      content,
    };

    articles.push(article)
    
    await writeFile(`${articlesFolder}/data.json`, JSON.stringify(articles));

    res.status(200).send("Article created successfully");

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { createArticlePage, createArticle };
