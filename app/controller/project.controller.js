const Project = require("../model/project.model");
const MemberProject = require("../model/member.project.model");

const index = async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    let query = Project.query()
      .whereExists(
        Project.relatedQuery('memberProjects')
          .where("memberProjects.id_user", req.user.id)
      )
      .withGraphFetched("todos")
      .modifyGraph("todos", (builder) => {
        builder.joinRelated("user").select([
          "todos.id",
          "description",
          "name as created_by",
          "todos.created_at",
          "todos.updated_at",
          "is_completed"
        ]);
      });

    if (req.query.search) {
      const { search } = req.query;
      const lowerSearch = search.toLowerCase();
      query = query
        .where((builder) => {
          builder
            .whereRaw("LOWER(name) like ?", [`%${lowerSearch}%`])
            .orWhereExists(
              Project.relatedQuery('todos')
                .whereRaw("LOWER(description) like ?", [`%${lowerSearch}%`])
            );
        });
    }
    if(req.query.complete){
      const { complete } = req.query;
      if(complete == "true") {
        query.whereNotExists(
          Project.relatedQuery('todos')
            .where("is_completed",  false)
          )
      }
      if(complete == "false") {
        query.whereExists(
          Project.relatedQuery('todos')
            .where("is_completed",  false)
          )
      }
    }
    if(req.query.name){
      const { name } = req.query;
      if(name == "asc") {
        query.orderBy("name", "asc")
      }
      if(name == "desc") {
        query.orderBy("name", "desc")
      }
    }
    const projects = await query.page(page - 1, pageSize);
    let uncomplete_todo = 0;
    let totalDone = 0;
    let totalOnProgress = 0;
    projects.results = projects.results.map((project) => {
      const totalTodos = project.todos.length;
      const totalIsCompleted = project.todos.filter(todo => todo.is_completed).length;
      uncomplete_todo += (totalTodos - totalIsCompleted);
      const percentage = totalTodos ? (totalIsCompleted / totalTodos) * 100 : 0;

      const sortedTodos = project.todos.sort((a, b) => a.is_completed - b.is_completed);

      const processedTodos = sortedTodos.slice(0, 3);

      if (percentage === 100) {
        totalDone++;
      } else {
        totalOnProgress++;
      }
      return {
        ...project,
        percentage: Math.trunc(percentage),
        completed: totalIsCompleted,
        not_completed: totalTodos - totalIsCompleted,
        total: totalTodos,
        todos: processedTodos,
      };
    });

    const totalProjects = projects.total;

    const status = {
      uncomplete_todo,
      totalProjects,
      totalDone,
      totalOnProgress
    };

    res.status(200).json({
      status: 200,
      message: "Success get!",
      data: projects.results,
      status,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProjects / pageSize),
        pageSize,
        totalProjects,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async(req, res) => {
  const trx = await Project.startTransaction();
  try {
    const project = await Project.query(trx).insert({
      name: req.body.name
    })

    await MemberProject.query(trx).insert({
      id_user: req.user.id,
      id_project: project.id
    });

    await trx.commit();
    res.status(201).json({
      status: 201,
      message: "Success create!",
      data: project,
    });
  } catch (error) {
    await trx.rollback()
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

const show = async(req, res) => {
  try {
    const project = await Project.query()
    .findById(req.params.id)
    .withGraphFetched("todos")
    .modifyGraph("todos", (builder) => {
      builder.joinRelated("user").select([
        "todos.id",
        "description",
        "is_completed",
        "user.name as created_by",
        "todos.created_at",
        "todos.updated_at"
      ])
    })
    if(project.length == 0)
      return res.status(404).json({
        status: 404,
        message: "Id project not found!",
        data: null
      });

    res.status(200).json({
      status: 200,
      message: "Success get!",
      data: project
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

const destroy = async (req, res) => {
  try {
    const project = await Project.query()
      .deleteById(req.params.id);
    if(!project) {
      return res.status(404).json({
        status: 404,
        message: "Id project not found!",
        data: null
      });
    }
    res.status(200).json({
      status: 200,
      message: "Success delete project!",
      data: null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

const update = async (req, res) => {
  try {
    const project = await Project.query().updateAndFetchById(req.params.id, {
      name: req.body.name
    });
    res.status(200).json({
      status: 200,
      message: "Success update project!",
      data: project
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
}

module.exports = {
  store,
  index,
  show,
  destroy,
  update
}
