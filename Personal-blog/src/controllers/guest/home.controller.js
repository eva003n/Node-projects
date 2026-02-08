import { readArticleData } from "../../utils/index.js"

async function homePage(req, res) {

    // display a list of articles published on the blog

    const articles = await readArticleData();
    res.render("home", {articles})

}

export {
    homePage
}