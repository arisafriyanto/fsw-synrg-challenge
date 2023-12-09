import { TParams } from "../interfaces/IRest";
import Cars, { ICars } from "../models/Cars";

class ServiceCars {
  constructor() {}
  async list(params?: TParams) {
    try {
      const response = await Cars.list({ available: params?.available });
      return response;
    } catch (error) {
      return error;
    }
  }

  async show(id: string) {
    try {
      const response = await Cars.show(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async create(payload: ICars) {
    try {
      const response = await Cars.create(payload);
      return response;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, payload: ICars) {
    try {
      const response = await Cars.update(id, payload);
      return response;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string, deleted_by: string) {
    try {
      const response = await Cars.remove(id, deleted_by);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceCars();
