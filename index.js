const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

let port = 8080;

const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));
app.set("public", path.join(__dirname, "/public"));

app.use(methodOverride('_method'));

let posts = [
  {
    id: uuidv4(),
    username: "mukul",
    content: "Keep doing hard work for a better future"
  },
  {
    id: uuidv4(),
    username: "dheer",
    content: "Work hard till your last breadth"
  },
  {
    id : uuidv4(),
    username: "Harsh",
    content: "do your work smartly"
  }
];

app.get("/posts", (req, res) => {
  res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    // console.log(post);
    res.render("show.ejs",{post});
})

app.post("/posts",(req,res)=>{
    let{username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content})
    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let newContent = req.body.content;
  let post = posts.find((p)=>p.id===id);
  post.content = newContent;
  console.log(post);
  res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((p)=> id===p.id);
  res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
  let {id} = req.params;
  posts=posts.filter((p)=> p.id !=id);
  res.redirect("/posts");
})



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
