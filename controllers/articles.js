const Article = require('../models/article');
const User  = require('../models/user');

class ToDoController{

   static createArticle(req,res){
      let {title, content, category} = req.body;
      let author = req.decoded._id;
      console.log("---> ", author)
      
      Article.create({
         title,
         content,
         category,
         author
      })
      .then(function(created){
         res.status(200).json({
            message: "created new article",
            created
         });
      })
      .catch(function(err){
         res.status(500).json(err.message);
      })
   }

   static getAllArticles(req,res){
      Article.find()
      .populate('author')
      .then(function(blogs){
        console.log("masuk sini ");
        console.log(blogs)
         res.status(200).json(blogs)
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }

   static getOneArticle(req,res){
      let {id} = req.params

      Article.findById({_id:id})
      .populate('author')
      .then(function(article){
         res.status(200)
         .json({
            message: "Found article's details",
            article
         })
      })
      .catch(function(err){
         res.status(400)
         .json(err.message)
      })
   }
   static searchCategory(req,res){
      let categoryName = req.query.category;
      
      Article.find({category: categoryName})
      .populate('author')
      .then(function(articles){
         res.status(200).json({
            message: "here are the articles with this category",
            articles
         })
      })
      .catch(function(err){
         res.status(400).json(err.message)
      })
   }

   static getArticleByAuthor(req,res){
      let authorName = req.body.author
      console.log(authorName)

      Article.find({})
      .populate({
        path: 'author',
        match: {
          name : authorName
        },
        select: "name"
      })
      .then(function(articles){
        console.log(articles)
        res.status(200).json({
          message: "found a list of articles from this author",
          articles
        })
      })
      .catch(function(err){
        console.log("error")
        res.status(400).json(err.message)
      })
   }


   static updateArticle(req,res){
      let articleId = req.params.id
      let {title, content, category} = req.body;
      let id = req.decoded._id;
      
      let newData = {}
      if(title){
        newData["title"] = title;
      }
      if(content){
        newData["content"]= content;
      }
      if(category){
        newData["category"] = category;
      }
      console.log("-------", newData)

      Article.update({_id: articleId}, {$set: newData}).exec()
      .then(function(updatedItem){
         Article.findById({_id:articleId})
         .populate('author')
        .then(function(newItem){
          res.status(200).json({
            message: "data updated",
            newItem
          })
        })
        .catch(function(err){
          res.status(400).json(err.message)
        })
      })
      .catch(function(err){
         res.status(400).json(err.message)
      })
   }

   static deleteArticle(req,res){
      let blogId = req.params.id;

      Article.deleteOne({_id: blogId})
      .then(function(){
         res.status(200).json("Articles deleted")
      })
      .catch(function(err){
         res.status(400).json(err.message);
      })
   }
}

module.exports = ToDoController;