import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import Auth from "./routes/registrationRouter.js";

dotenv.config();

const app = express();
const BASE_URL = "https://repo-mediscus-app.onrender.com";

app.use(cors());
app.use(express.json()); // This middleware will parse the request body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(`${BASE_URL}/api`, Auth);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${BASE_URL}`);
});
