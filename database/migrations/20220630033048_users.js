exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("name");
    table.string("email");
    table.string("password");
    table.string("phone_number");
    table.string("image_profile");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
