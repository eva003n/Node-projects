import { randomUUID } from "crypto";
import { readData } from "../../utils/index.js";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { json } from "stream/consumers";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const articlesFile = path.resolve(__dirName, "../../articles/data.json");

const createComment = async (req, res) => {
  const { articleId, content } = req.body;

  const comment = {
    id: randomUUID(),
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
    replies: []
  };

  try {
    const articles = await readData();

    const modifiedArticles = articles.map(article => {
        if(article.id === articleId) {
            if(!article.comments) {
                article["comments"] = [comment];
            }else {
                article.comments.push(comment)
            }
            return article;
        }
    })

    await writeFile(articlesFile, JSON.stringify(modifiedArticles))
    res.status(201).json({message: "Commented successfully"})
  } catch (error) {
    res.status(500).send(`<h1>${error.message}</h1>`);

  }
};
const updateComment = async (req, res) => {
  const { articleId, content } = req.body;
  const commentId = req.params.id; 

  try {
    const articles = await readData();

    articles.foreach(article => {
        if(article.id === articleId) {
           return article?.comments.foreach(comment => {
                if(comment.id === commentId) {
                    comment.content = content;
                    comment.updatedAt = new Date()
                }

            })
        }
    })

    await writeFile(articlesFile, JSON.stringify(articles))
    
  } catch (error) {
    res.status(500).send(`<h1>${error.message}</h1>`);
  }

};
const deleteComment = async (req, res) => {
  const { articleId} = req.body;

    const commentId = req.params.id;

    try {
        const articles = await readData();

        articles.foreach(article => {
            if(article.id === articleId) {
                return article.comments.filter(comment => comment.id === commentId)
            }
        })
        
        
    } catch (error) {
            res.status(500).send(`<h1>${error.message}</h1>`);        
    }
};

export { createComment, updateComment, deleteComment };
