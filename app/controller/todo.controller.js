const MemberProject = require("../model/member.project.model");
const Project = require("../model/project.model");
const Todo = require("../model/todo.model");

const show = async (req, res) => {
  try {
    const memberProject = await MemberProject.query()
    .where("id_project", req.params.id_project)
    .where("id_user", req.user.id);
    if(memberProject.length == 0) {
      return res.status(403).json({
        status : 403,
        message: "Can't access to this project or project not found!",
        data: null
      })
    }
    const project = await Project.query()
      .findById(req.params.id_project)
      .withGraphFetched("todos")
      .withGraphFetched("memberProjects")
      .modifyGraph("todos", (builder) => {
        builder.withGraphFetched("user");
      });
    project.todos.forEach((todo) => {
      todo.created_by = todo.user.name;
      delete todo.user;
    });
    res.status(200).json({
      status: 200,
      message: "Success get todo!",
      data: project,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    const todo = await Todo.query().insert({
      id_project: req.body.id_project,
      created_by: req.user.id,
      description: req.body.description,
    });
    res.status(201).json({
      status: 201,
      message: "Success created todo!",
      data: todo,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const todo = await Todo.query()
      .findById(req.params.id)
      .withGraphFetched("project")
      .modifyGraph("project", (builder) => {
        builder.withGraphFetched("memberProjects");
      });
    if(todo) {
      const checkMember = todo.project.memberProjects.find(
        (e) => (e.id_user == req.user.id)
      );
      if (!checkMember) {
        return res.status(403).json({
          status: 403,
          message: "Can't access to this project!",
          data: null,
        });
      }
      const newTodo = await Todo.query().updateAndFetchById(req.params.id, {
        description: req.body.description,
        is_completed: req.body.is_completed,
      });
      return res.status(200).json({
        status: 200,
        message: "Success updated todo!",
        data: newTodo,
      });
    }
    return res.status(404).json({
      status: 404,
      message: "Id todo not found!",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const todo = await Todo.query()
      .findById(req.params.id)
      .withGraphFetched("project")
      .modifyGraph("project", (builder) => {
        builder.withGraphFetched("memberProjects");
      });
    if(todo) {
      const checkMember = todo.project.memberProjects.find(
        (e) => (e.id_user == req.user.id)
      );
      if (!checkMember) {
        return res.status(403).json({
          status: 403,
          message: "Can't access to this project!",
          data: null,
        });
      }
    }
    const deleteTodo = await Todo.query().deleteById(req.params.id);
    if (!deleteTodo) {
      return res.status(404).json({
        status: 404,
        message: "Id todo not found!",
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: "Success deleted todo!",
      data: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  store,
  show,
  update,
  destroy,
};
