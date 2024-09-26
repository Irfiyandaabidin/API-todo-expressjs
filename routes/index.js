const AuthRouter = require("./auth");
const UserRouter = require("./user");
const ProjectRouter = require("./project");
const TodoRouter = require("./todo");
const MemberRouter = require("./memberProject");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, ProjectRouter);
  app.use(prefix, TodoRouter);
  app.use(prefix, MemberRouter);
};

module.exports = routes;
