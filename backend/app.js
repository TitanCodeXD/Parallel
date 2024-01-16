require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT || 5000;



const app = express()

// config JSON and form data reponse
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// Solve CORS
app.use(cors({credentials: true, origin: "*"})); //Padrão "http://localhost:3000"

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// DB Conecction
require("./config/db.js");

// routes 
const router = require("./routes/Router.js")

app.use(router)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

console.log("PORT:", process.env.PORT);