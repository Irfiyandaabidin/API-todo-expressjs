/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("todos", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("id_project").unsigned();
    table.foreign("id_project").references("id").inTable("projects").onDelete("cascade");
    table.uuid("created_by").unsigned();
    table.foreign("created_by").references("id").inTable("users").onDelete("cascade");
    table.string("description").notNullable();
    table.boolean("is_completed").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("todos");
};
