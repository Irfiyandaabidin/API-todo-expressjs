/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("member_projects", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("id_user").unsigned();
    table.foreign("id_user").references("id").inTable("users").onDelete("cascade");
    table.integer("id_project").unsigned();
    table.foreign("id_project").references("id").inTable("projects").onDelete("cascade");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.unique(["id_user", "id_project"]);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("member_projects");
};
