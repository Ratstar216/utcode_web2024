import express from "express";
import { readFileSync } from "node:fs";


const app = express();

app.use(express.urlencoded({ extended: true }));
// app.use(express.static("static"));


let posts = [];


const file = readFileSync("./BulletinBoard.html", "utf-8");
app.get("/", (request, response) => {
    response.send(
        file.replace("<!-- POSTS -->", posts.map(post => `<li>${post}</li>`).join(""))
    ); 
})
app.post("/send", (request, response) => {
    posts.push(request.body.message);
    response.redirect("/");
});
app.listen(3000);

