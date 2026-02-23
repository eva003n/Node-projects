import { readData } from "../../utils/index.js"

async function homePage(req, res) {

    // display a list of articles published on the blog

    const articles = await readData();
    res.render("home", {articles})

}

export {
    homePage
}