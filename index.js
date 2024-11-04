import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { apiKey } from "./secrets.js";

const app = express();
const port = 3000;
const baseUrl = "https://api.openuv.io/api/v1";
const config = {
    headers: { 
        "Content-Type": "application/json",
        "x-access-token": "openuv-48k5rm32hyush-io"
     },
  };

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/get-forecast", async (req, res) => {
    try {
        const result = await axios.get(`${baseUrl}/uv?lat=${req.body.lat}&lng=${req.body.lng}`, { headers: { 
            "Content-Type": "application/json",
            "x-access-token": apiKey,
         }});
         res.render("index.ejs", { content: result.data });
    } catch (error) {
        console.log(error.response.data);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});