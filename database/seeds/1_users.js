const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  await knex('users').del()
  return await knex("users").insert([
    {
      name: "Irfi",
      email: "irfi@example.com",
      password: await bcrypt.hash("secret", 10),
      phone_number: "0888888888"
    },
    {
      name: "yanda",
      email: "yanda@example.com",
      password: await bcrypt.hash("secret", 10),
      phone_number: "0888888888"
    },
    {
      name: "Abidin",
      email: "abidin@example.com",
      password: await bcrypt.hash("secret", 10),
      phone_number: "0888888888"
    },
    {
      name: "irfiyanda",
      email: "irfiyanda@example.com",
      password: await bcrypt.hash("secret", 10),
      phone_number: "0888888888"
    },
  ]);
};
