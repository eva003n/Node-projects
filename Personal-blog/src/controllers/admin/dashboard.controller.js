import { readArticleData } from "../../utils/index.js"

async function getDashboardPage(req, res) {
    const articles = await readArticleData();
    
    res.render("dashboard", {articles});
    

}

export {
    getDashboardPage
}