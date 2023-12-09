import { IRestModel, TParams } from "../interfaces/IRest";
import database from "../config/database";

export interface ICars {
  id: string;
  name: string;
  price: number;
  photo: string;
  start_rent: Date;
  finish_rent: Date;
  available: boolean;
  status: boolean;
}

class Cars implements IRestModel<ICars> {
  constructor() {}

  async list(params?: TParams) {
    let query: any = database.select("*").from("cars").where("status", true);

    if (params && params.available === true) {
      query = query.andWhere("available", true);
    }

    const data = await query;
    return data as ICars[];
  }

  async show(id: string) {
    const data = await database.select("*").from("cars").where("id", id).andWhere("status", true);
    if (data.length === 0) {
      return null;
    }
    return data[0] as ICars;
  }

  async create(payload: ICars) {
    const data = await database("cars").insert(payload);
    return data;
  }

  async update(id: string, payload: ICars) {
    const data = await database("cars").where("id", id).andWhere("status", true).update(payload);
    return data;
  }

  async remove(id: string, deleted_by: string) {
    const data = await database("cars")
      .where("id", id)
      .andWhere("status", true)
      .update({ deleted_by, status: false });
    return data;
  }
}

export default new Cars();
