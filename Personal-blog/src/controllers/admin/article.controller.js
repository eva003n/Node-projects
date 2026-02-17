import { readArticleData, formatDate } from "../../utils/index.js"
import {writeFile} from "fs/promises"
import { randomUUID } from "crypto";

import path from "path";
import { fileURLToPath } from "url";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const articlesFile = path.resolve(__dirName, "../../articles/data.json");


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
      content
    };

    articles.push(article);

    await writeFile(articlesFile, JSON.stringify(articles));

    res.status(200).send("Article created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function editArticle(req, res) {
  try {
    const { title, date, content } = req.body;

    // check if article exist
    const articles = await readArticleData();

    const isArticle = articles.find((article) => article.title === title);

    if (!isArticle) {
      return res.status(404).send("<h1>Article doesnt exists</h1>");
    }

    articles.forEach((article) => {
      if (article.title === title) {
        article.title = title;
        article.date = formatDate(date);
        article.content = content;

        return article;
      }
    });

    await writeFile(articlesFile, JSON.stringify(articles));

    res.send("<h1>Article updated successfully</h1>");
  } catch (error) {
    res.status(500).send(`<h1>${error.message}</h1>`);
  }
}

async function createArticleEditPage(req, res) {
  try {
    const id = req.params.id;
    const articles = await readArticleData();

    const article = articles.find((article) => {
      if (article.id === id) {
        article.date = new Date(article.date).toISOString().slice(0, 10);
        return article;
      }
    });

    // prevent rendering data that doesnt exists
    if (!article)
      return res.status(404).send("<h1>Article doesn't exists</h1>");

    res.status(200).render("editarticle", article);
  } catch (error) {
    res.status(500).send(`<h1>${error.message}</h1>`);
  }
}






async function deleteArticle(req, res) {
    const id = req.params.id
    try {
        const articles = await readArticleData();
        const newArticles = articles.filter(article => article.id !== id )

        // wrute to file with new articles
        await writeFile(articlesFile, JSON.stringify(newArticles))

        res.status(200).send( "Article deleted successfully")
        

    } catch (error) {
        console.error(`Error deleting article: ${error.message}`)
    }
    
}

export {
createArticle,
createArticlePage,
    editArticle,
    createArticleEditPage,
    deleteArticle
}