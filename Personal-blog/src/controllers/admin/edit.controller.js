import { formatDate, readArticleData } from "../../utils/index.js";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const articlesFile = path.resolve(__dirName, "../../articles/data.json");

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
    if (!article) return res.status(404).send("<h1>Article doesn't exists</h1>");

    res.status(200).render("editarticle", article);
  } catch (error) {
    res.status(500).send(`<h1>${error.message}</h1>`);

  }
}
export { editArticle, createArticleEditPage };
