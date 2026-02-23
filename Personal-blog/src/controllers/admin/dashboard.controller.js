import { readData } from "../../utils/index.js"

async function getDashboardPage(req, res) {
    const articles = await readData();
    
    res.render("dashboard", {articles});
    

}

export {
    getDashboardPage
}