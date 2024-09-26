/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todos').del();

  const users = await knex('users').select('id');
  const projects = await knex('projects').select('id');

  await knex('todos').insert([
    // Todos for Project 1
    {created_by: users[0].id, id_project: projects[0].id, description: "Setup project repository", is_completed: true},
    {created_by: users[0].id, id_project: projects[0].id, description: "Define project scope"},
    {created_by: users[0].id, id_project: projects[0].id, description: "Assign team members"},

    // Todos for Project 2
    {created_by: users[1].id, id_project: projects[1].id, description: "Create project wireframe", is_completed: true},
    {created_by: users[1].id, id_project: projects[1].id, description: "Develop initial frontend layout"},
    {created_by: users[1].id, id_project: projects[1].id, description: "Set up database schema"},
    {created_by: users[1].id, id_project: projects[1].id, description: "API integration testing"},

    // Todos for Project 3
    {created_by: users[2].id, id_project: projects[2].id, description: "Client meeting for requirement gathering", is_completed: true},
    {created_by: users[2].id, id_project: projects[2].id, description: "Draft project proposal"},
    {created_by: users[2].id, id_project: projects[2].id, description: "Create project timeline"},

    // Todos for Project 4
    {created_by: users[3].id, id_project: projects[3].id, description: "Build authentication system"},
    {created_by: users[3].id, id_project: projects[3].id, description: "Optimize performance"},
    {created_by: users[3].id, id_project: projects[3].id, description: "Deploy project to staging server"},

    // Todos for Project 5
    {created_by: users[0].id, id_project: projects[4].id, description: "Update project documentation", is_completed: true},
    {created_by: users[0].id, id_project: projects[4].id, description: "Fix bugs in the API"},
    {created_by: users[0].id, id_project: projects[4].id, description: "Test user authentication flow"},

    // Todos for Project 6
    {created_by: users[1].id, id_project: projects[5].id, description: "Design database migrations", is_completed: true},
    {created_by: users[1].id, id_project: projects[5].id, description: "Setup continuous integration"},
    {created_by: users[1].id, id_project: projects[5].id, description: "Develop unit tests"},

    // Todos for Project 7
    {created_by: users[2].id, id_project: projects[6].id, description: "Research for new project tools", is_completed: true},
    {created_by: users[2].id, id_project: projects[6].id, description: "Develop user roles management"},
    {created_by: users[2].id, id_project: projects[6].id, description: "Prepare for project presentation"},

    // Todos for Project 8
    {created_by: users[3].id, id_project: projects[7].id, description: "Setup load balancing"},
    {created_by: users[3].id, id_project: projects[7].id, description: "Implement caching mechanism"},
    {created_by: users[3].id, id_project: projects[7].id, description: "Improve logging system"},

    // Todos for Project 9
    {created_by: users[0].id, id_project: projects[8].id, description: "Organize code review session", is_completed: true},
    {created_by: users[0].id, id_project: projects[8].id, description: "Review project dependencies"},
    {created_by: users[0].id, id_project: projects[8].id, description: "Upgrade project libraries"},

    // Todos for Project 10
    {created_by: users[1].id, id_project: projects[9].id, description: "Setup monitoring and alerting system", is_completed: true},
    {created_by: users[1].id, id_project: projects[9].id, description: "Optimize database queries"},
    {created_by: users[1].id, id_project: projects[9].id, description: "Implement security features"},

    // Todos for Project 11
    {created_by: users[2].id, id_project: projects[10].id, description: "Prepare end-user documentation", is_completed: true},
    {created_by: users[2].id, id_project: projects[10].id, description: "Train internal team on project usage"},
    {created_by: users[2].id, id_project: projects[10].id, description: "Setup project backup strategy"},

    // Todos for Project 12
    {created_by: users[3].id, id_project: projects[11].id, description: "Handle project user feedback"},
    {created_by: users[3].id, id_project: projects[11].id, description: "Plan future project enhancements"},
    {created_by: users[3].id, id_project: projects[11].id, description: "Conduct post-project retrospective"},
  ]);
};
