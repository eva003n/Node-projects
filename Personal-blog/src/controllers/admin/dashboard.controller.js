import { readData } from "../../utils/index.js"

async function getDashboardPage(req, res) {
    const articles = await readData();
    
    res.render("pages/dashboard", {articles, user: req.session.userId});
    

}

export {
    getDashboardPage
}