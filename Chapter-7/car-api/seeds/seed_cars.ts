import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      name: "Avanza",
      price: 200000,
      photo: "image.png",
      start_rent: "2023-11-25",
      finish_rent: "2023-11-27",
      available: true,
      created_by: "superfranky",
    },
    {
      name: "Brio",
      price: 150000,
      photo: "image.png",
      start_rent: "2023-11-26",
      finish_rent: "2023-11-28",
      available: true,
      created_by: "superfranky",
    },
    {
      name: "Xenia",
      price: 160000,
      photo: "image.png",
      start_rent: "2023-11-27",
      finish_rent: "2023-11-29",
      available: true,
      created_by: "superfranky",
    },
  ]);
}
