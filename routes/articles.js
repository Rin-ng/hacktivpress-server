var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articles')
const auth = require('../middlewares/auth')

/* GET users listing. */
router
  .post('/addNew', auth, articleController.createArticle)
  .put('/:id/edit', auth, articleController.updateArticle)
  .delete('/:id/delete', auth, articleController.deleteArticle)
  .get('/', articleController.getAllArticles)
  .get('/find/:id', articleController.getOneArticle)
  .get('/find', articleController.searchCategory)
  .post('/find', articleController.getArticleByAuthor)
module.exports = router;
