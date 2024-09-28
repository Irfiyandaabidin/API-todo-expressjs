const { format } = require("mysql");
const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Todo extends Model {
  static get tableName() {
    return "todos";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id_project: {
          type: "string",
          format: "uuid"
        },
        created_by: {
          type: "string",
          format: "uuid"
        },
        description: {
          type: "string"
        },
        is_completed: {
          type: "boolean"
        }
      }
    }
  }

  static get relationMappings() {
    const Project =  require("./project.model");
    const User =  require("./user.model");

    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: "projects.id",
          to: "todos.id_project"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "todos.created_by"
        }
      }
    }
  }

  $beforeUpdate(queryContext) {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = Todo;
