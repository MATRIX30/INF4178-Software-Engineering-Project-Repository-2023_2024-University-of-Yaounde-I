const express =require ("express");
const app = express();
const port = 3000;
const sequelize = require("./db/sequelize");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
sequelize.initDB();
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

