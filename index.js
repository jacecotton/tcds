const express = require("express");
const path = require("path");

const content = require("./content");

const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

require("./router")(app);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "twig");

app.use((_req, res) => {
  res.status(404);
  res.render("pages/404", {
    nav: content,
  });
});

app.listen(port, () => {
  console.log(`Server listening on http://${host}:${port}`);
});