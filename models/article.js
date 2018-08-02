const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ArticleSchema = new Schema({
    title: {
        type: String,
        required: "Please input title of article"
    },
    content:{
        type: String,
        required: "Please input some content for your article"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category:{
        type: String, 
        required: "Please put category"
    }
}, {timestamps:true});


const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;