const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Project extends Model {
  static get tableName() {
    return "projects";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
        }
      }
    }
  }

  static get relationMappings() {
    const MemberProject = require("./member.project.model");
    const Todo = require("./todo.model");

    return {
      memberProjects: {
        relation: Model.HasManyRelation,
        modelClass: MemberProject,
        join: {
          from: "projects.id",
          to: "member_projects.id_project"
        }
      },
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: "projects.id",
          to: "todos.id_project"
        }
      },
    }
  }

  $beforeUpdate(queryContext) {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Project;
