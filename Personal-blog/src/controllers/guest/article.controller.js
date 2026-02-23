import { readData } from "../../utils/index.js";

async function articlePage(req, res) {
  // diplay info about an article
  try {
    const id = req.params.id;
    const articles = await readData();

    const article = articles.find((article) => article.title === id);

    // prevent rendering data that doesnt exists
    if (!article)
      return res.status(404).send("<h1>Article doesn't exists</h1>");

    res.status(200).render("article", article);
  } catch (error) {
    res.status(500).send(`<h1>${error.message}</h1>`);
  }
}

export { articlePage };
