/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('member_projects').del();

  const users = await knex('users').select('id');
  const projects = await knex('projects').select('id');

  await knex('member_projects').insert([
    // User 1
    {id_project: projects[0].id, id_user: users[0].id},
    {id_project: projects[1].id, id_user: users[0].id},
    {id_project: projects[2].id, id_user: users[0].id},
    {id_project: projects[3].id, id_user: users[0].id},
    {id_project: projects[4].id, id_user: users[0].id},
    {id_project: projects[5].id, id_user: users[0].id},
    {id_project: projects[6].id, id_user: users[0].id},

    // User 2
    {id_project: projects[0].id, id_user: users[1].id},
    {id_project: projects[1].id, id_user: users[1].id},
    {id_project: projects[2].id, id_user: users[1].id},
    {id_project: projects[3].id, id_user: users[1].id},
    {id_project: projects[4].id, id_user: users[1].id},
    {id_project: projects[5].id, id_user: users[1].id},
    {id_project: projects[6].id, id_user: users[1].id},

    // User 3
    {id_project: projects[7].id, id_user: users[2].id},
    {id_project: projects[8].id, id_user: users[2].id},
    {id_project: projects[9].id, id_user: users[2].id},
    {id_project: projects[10].id, id_user: users[2].id},
    {id_project: projects[11].id, id_user: users[2].id},
    {id_project: projects[0].id, id_user: users[2].id},
    {id_project: projects[1].id, id_user: users[2].id},

    // User 4
    {id_project: projects[2].id, id_user: users[3].id},
    {id_project: projects[3].id, id_user: users[3].id},
    {id_project: projects[4].id, id_user: users[3].id},
    {id_project: projects[5].id, id_user: users[3].id},
    {id_project: projects[6].id, id_user: users[3].id},
    {id_project: projects[7].id, id_user: users[3].id},
    {id_project: projects[8].id, id_user: users[3].id},
  ]);
};
