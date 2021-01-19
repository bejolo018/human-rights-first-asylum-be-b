exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('email');
      table.string('name');
      table.string('avatarUrl');
      table.timestamps(true, true);
    })
    .createTable("cases", table=> {
      table.increments();
      table.integer("user_id")
        .references("profiles.id")
        .notNullable()
        .unsigned();
      table.string("case_pdf")
        .notNullable()
        .unique();
      table.string("case_name")
        .notNullable();
    })
    .createTable("main_categories", table => {
      table.increments();
      table.string("main_category_name")
        .unique()
        .notNullable();
    })
    .createTable("sub_categories", table => {
      table.increments();
      table.string("sub_category_name")
        .unique()
        .notNullable();
    })
    .createTable("tags", table => {
      table.increments();
      table.integer("main_id")
        .references("main_categories.id")
        .unsigned();
      table.integer("sub_id")
        .references("sub_categories.id")
        .unsigned();
      table.string("tag_name")
        .unique()
        .notNullable();
    })
    .createTable("tags_by_cases", table => {
      table.increments();
      table.integer("tag_id")
        .references("tags.id")
        .notNullable()
        .unsigned();
      table.integer("case_id")
        .references("cases.id")
        .notNullable()
        .unsigned();
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('tags_by_cases')
    .dropTableIfExists('tags')
    .dropTableIfExists('subcategories')
    .dropTableIfExists('main_categories')
    .dropTableIfExists('cases')
    .dropTableIfExists('profiles');
};
