const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "email", "password", "phone_number"],

      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        phone_number: {
          type: "string"
        }
      },
    };
  }

  static get relationMappings() {
    const MemberProject = require("./member.project.model");
    const Todo =  require("./todo.model");

    return {
      member_project: {
        relation: Model.HasManyRelation,
        modelClass: MemberProject,
        join: {
          from: "users.id",
          to: "member_projects.id_user"
        }
      },
      todo: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
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

module.exports = User;
