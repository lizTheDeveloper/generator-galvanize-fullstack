exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("books", function(table) {
      table.increments();
      table.string("name");
      table.integer("author_id").references("id").inTable("authors");
    }),

    knex.schema.table("authors", function(table) {
      table.integer("book_id").references("id").inTable("books");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("books");
};