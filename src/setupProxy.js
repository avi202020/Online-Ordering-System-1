const proxy = require("http-proxy-middleware");
const port = process.env.PORT || 5000;

module.exports = function(app) {
  app.use(proxy("/auth/**", { target: `http://localhost:${port}` }));
  app.use(proxy("/order", { target: `http://localhost:${port}` }));
};
