import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("cars", (builder) => {
    builder.increments("id").primary().notNullable();
    builder.string("name").notNullable();
    builder.integer("price").notNullable().defaultTo(0);
    builder.string("photo").defaultTo("image.png");
    builder.string("start_rent").notNullable();
    builder.string("finish_rent").notNullable();
    builder.boolean("available").notNullable().defaultTo(true);
    builder.string("created_by").notNullable();
    builder.string("updated_by");
    builder.string("deleted_by");
    builder.boolean("status").notNullable().defaultTo(true);
    builder.dateTime("created_at").defaultTo(knex.fn.now());
    builder.dateTime("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists("cars");
}
