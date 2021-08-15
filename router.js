const { TwingEnvironment, TwingLoaderFilesystem } = require("twing");
const drupalFilters = require("twing-drupal-filters");
require("./src/tcds/scripts/lib/slugify");

const content = require("./content");

const loader = new TwingLoaderFilesystem("./views");
const twing = new TwingEnvironment(loader);
drupalFilters(twing);

function handler(_req, res, page) {
  twing.render(`${page.template}.twig`, {
    title: page.title,
    displaytitle: page.displaytitle,
    description: page.description,
    audience: page.audience,
    category: page.category,
    href: page.href,
    nav: content,
  }).then((output) => {
    res.end(output);
  });
}

module.exports = (app) => {
  content.forEach((category) => {
    let categoryRoute;

    if(category.route) {
      categoryRoute = `/${category.route}/`;
    } else if(category.title && !category.route) {
      categoryRoute = `/${category.title.slugify()}/`;
    } else if(!category.title && !category.route) {
      categoryRoute = "/";
    }

    category.pages.forEach((page) => {
      let pageRoute = "";
      let pageTemplate = "pages" + categoryRoute;

      if(page.route !== undefined) {
        pageRoute = page.route;
        pageTemplate += page.template || page.route;
      } else if(page.title !== undefined && page.route == undefined && page.template == undefined) {
        pageRoute = page.title.slugify();
        pageTemplate += pageRoute;
      }

      let route = categoryRoute + pageRoute;

      app.get(route, (req, res) => {
        handler(req, res, {
          template: pageTemplate,
          title: page.title,
          displaytitle: page.displaytitle,
          description: page.description,
          audience: page.audience,
          category: category.title,
          href: req.route.path,
        });
      });
    });
  });
};