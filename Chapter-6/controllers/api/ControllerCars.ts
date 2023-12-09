import { Request, Response } from "express";
import { IRestController } from "../../interfaces/IRest";
import ServiceCars from "../../services/ServiceCars";
import { IUsers } from "../../models/Users";

declare module "express" {
  interface Request {
    user?: IUsers;
  }
}

class ControllerCars implements IRestController {
  constructor() {}
  async list(req: Request, res: Response) {
    const { available } = req.query;
    const isAvailable = available === "true";

    try {
      const response = await ServiceCars.list({ available: isAvailable });
      res.status(200).json({
        meta: {
          message: "Getting All Car",
          code: 200,
          success: true,
        },
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
      });
    }
  }

  async show(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const response = await ServiceCars.show(id);

      if (response === null) {
        res.status(401).json({
          meta: {
            message: "Car not found",
            code: 401,
            success: false,
          },
          data: null,
        });

        return;
      }

      res.status(200).json({
        meta: {
          message: "Getting Car by Id success",
          code: 200,
          success: true,
        },
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
      });
    }
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    data.created_by = (req as Request).user?.username;
    // console.log((req as Request).user?.username);
    try {
      await ServiceCars.create(data);

      res.status(200).json({
        meta: {
          message: "Create car success",
          code: 200,
          success: true,
        },
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
      });
    }
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    data.updated_by = (req as Request).user?.username;
    data.updated_at = new Date().toISOString();

    try {
      const response = await ServiceCars.update(id, data);

      if (response === 0) {
        res.status(404).json({
          meta: {
            message: "Car not found",
            code: 404,
            success: false,
          },
        });
      }

      res.status(200).json({
        meta: {
          message: "Update car success",
          code: 200,
          success: true,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;
    const deleted_by: any = (req as Request).user?.username;

    console.log(deleted_by);

    try {
      const response = await ServiceCars.remove(id, deleted_by);

      if (response === 0) {
        res.status(404).json({
          meta: {
            message: "Car not found",
            code: 404,
            success: false,
          },
        });

        return;
      }

      res.status(200).json({
        meta: {
          message: "Delete car success",
          code: 200,
          success: true,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
      });
    }
  }
}

export default new ControllerCars();
