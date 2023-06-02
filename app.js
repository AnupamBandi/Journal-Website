const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")

const homeStartingContent = "Hello, welcome to the home page "
const aboutContent="This is about content"
const contactContent="This is contact section"

const posts=[];

const app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
//home page
app.get("/",function(req,res){
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts})
})
//about page
app.get("/about",function(req,res){
    res.render('about',{AboutContent:aboutContent})

})
// contact page

app.get('/contact', function(req, res){

    res.render('contact', { contactContent: contactContent});
})

// compose page
app.get('/compose', function(req, res){

    res.render('compose');
})
//post : post title
app.get('/posts/:postTitle',function(req,res){
    let requestTitle = _.lowerCase(req.params.postTitle)

    console.log("requestTitle",requestTitle)

    posts.forEach(function(post){
        if(_.lowerCase(post.postTitle) === requestTitle){
            res.render('post',{post:post})
}})
});

app.post('/compose',function(req,res){
    let postTitle = req.body.postTitle
    let postBody = req.body.postBody

    let postObj = {
        postTitle:postTitle,
        postBody:postBody
    }
    posts.push(postObj)
    res.redirect("/")

})







app.listen(3000,function(){
    console.log("server started on port 3000");
});