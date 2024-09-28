const { format } = require("mysql");
const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class MemberProject extends Model {
  static get tableName() {
    return "member_projects";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["id_user", "id_project"],

      properties: {
        id_user: {
          type: "string",
          format: "uuid"
        },
        id_project: {
          type: "string",
          format: "uuid"
        }
      }
    }
  }

  static get relationMappings() {
    const Project = require("./project.model");
    const User = require("./user.model");

    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: Project,
        join: {
          from: "projects.id",
          to: "member_projects.id_project"
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "member_projects.id_user"
        }
      }
    }
  }

  $beforeUpdate(queryContext) {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = MemberProject;
