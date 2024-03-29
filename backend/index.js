const connectToMongo = require("./db");
connectToMongo();
const cors = require("cors");
const express = require("express");

const app = express();
const port = 5000;

app.use(cors());
//Midleware to express deal with json file
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Notebook-Backend listening at http://localhost:${port}`);
});
