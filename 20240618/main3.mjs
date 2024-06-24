import { PrismaClient } from "@prisma/client";
import express from "express";
import { readFileSync } from "node:fs";

const client = new PrismaClient();

let posts = await client.post.findMany();

// console.log(`${posts[0].author}`);

const app = express();
app.use(express.urlencoded({ extended: true }));

const template = readFileSync("./index3.html", "utf-8");

app.get("/", async (request, response) => {
  posts = await client.post.findMany();
  response.send(template.replace("<!-- messages -->", posts.map(post => `<li>${post.id} ${post.author} ${post.title} ${post.message}</li>`).join("")));
}); 

app.post("/send", async (request, response) => {
  const { message, author, title } = request.body; 
  await client.post.create({ data: { message: message, author: author, title: title} });
  response.redirect("/");
})
// app.get("/", (request, response) => {
//     response.send("Hello, world!");
// }); 

app.listen(3000);