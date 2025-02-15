import express from "express";
import bodyParser from "body-parser";
import axios from "axios";



const app = express();
const port = 3000;
// express.urlencoded({extended: true});
app.use(bodyParser.urlencoded({extended:true}));

let reg = "1";

app.listen(port, ()=>{
    console.log(`Server running at port ${port} ...`);
})

app.use(express.static("public"));

app.get("/", (req,res)=>{
    reg = "1";
    res.render("index.ejs", {data: reg});
})


app.get("/generate_page", (req, res)=>{
    reg = "2";
    res.render("index.ejs", {data: reg});
}
)
app.post("/generate_page", (req, res)=>{
    reg = "2";
    res.render("index.ejs", {data: reg});
})

app.post("/generate_joke", async (req, res)=>{
    try{
        let response = {};
        if(req.body.type == "Pun"){
            response = await axios.get("https://v2.jokeapi.dev/joke/Dark,Pun?type=twopart");
        }
        if(req.body.type == "Family-friendly"){
            response = await axios.get("https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Spooky,Christmas?type=twopart");
        }
        if(req.body.type == "Dark"){
            response = await axios.get("https://v2.jokeapi.dev/joke/Dark?type=twopart");
        }
        if(req.body.type == "All"){
            response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=twopart");
        }
        reg = "3";
        res.render("index.ejs", {data: reg, setup : response.data.setup, delivery : response.data.delivery})
    } catch(error){
        res.status(500).send("Failed to fetch activity.");
}});

app.get("/credits", (req, res)=>{
    reg = "4";
    res.render("index.ejs", {data: reg})
})

app.get("/about_us", (req, res)=>{
    reg = "5";
    res.render("index.ejs", {data: reg})
})

