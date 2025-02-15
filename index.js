import express from "express";



const app = express();
const port = 3000;

app.listen(port, ()=>{
    console.log(`Server running at port ${port} ...`);
})

app.use(express.static("public"));

app.get("/", (req,res)=>{
    // res.send("<h1> Hello </h1>");
    res.render("index.ejs");
})