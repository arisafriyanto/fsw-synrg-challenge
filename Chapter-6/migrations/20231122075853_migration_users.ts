import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("users", (builder) => {
    builder.increments("id").primary().notNullable();
    builder.string("username").unique().notNullable();
    builder.string("email").unique().notNullable();
    builder.text("password").notNullable();
    builder.string("role").defaultTo("member");
    builder.dateTime("created_at").defaultTo(knex.fn.now());
    builder.dateTime("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("users");
}
