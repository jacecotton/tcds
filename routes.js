const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");

const pages = require("./pages");

const loader = new TwingLoaderFilesystem("./views");
const twing = new TwingEnvironment(loader);

function controller(req, res, data) {
  twing.render(`${data.template}.twig`, {
    title: data.title,
  }).then((output) => {
    res.end(output);
  });
}

module.exports = (app) => {
  pages.forEach((page) => {
    app.get(page.route ? page.route : `${page.template}`, (req, res) => {
      controller(req, res, {
        template: `pages/${page.template}`,
        title: page.title,
      });
    });
  });
};