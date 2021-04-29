const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

require("./routes")(app);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "twig");

app.use((req, res) => {
  res.status(404);
  res.render("pages/404");
});

app.listen(port, () => {
  console.log(`Server listening on http://${host}:${port}`);
});