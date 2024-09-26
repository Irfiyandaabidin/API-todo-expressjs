/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('projects').del();
  await knex('projects').insert([
    {name: 'Website Redesign'},
    {name: 'Mobile App Development'},
    {name: 'E-commerce Platform'},
    {name: 'Internal Dashboard'},
    {name: 'CRM Integration'},
    {name: 'API Development'},
    {name: 'Data Migration'},
    {name: 'Marketing Automation'},
    {name: 'User Analytics System'},
    {name: 'Customer Support Tool'},
    {name: 'Inventory Management'},
    {name: 'Cloud Infrastructure Setup'},
    {name: 'DevOps Pipeline Automation'},
  ]);
};
