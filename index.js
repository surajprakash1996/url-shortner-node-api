const express = require("express");
const app = express();
const PORT = 8001;
const connectDB = require("./connection");
const urlRoutes = require("./routes/url");

/** Connect database */
connectDB();

/** Middlewares  */
app.use(express.json());

app.use("/api/url/", urlRoutes);

app.listen(PORT, () => console.log(`Server running at Port : ${PORT}`));
