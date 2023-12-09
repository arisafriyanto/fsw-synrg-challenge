import { Request, Response, NextFunction } from "express";
import ServiceAuth from "../services/ServiceAuth";
// import jwt from "jsonwebtoken";
import { IUsers } from "../models/Users";
declare module "express" {
  interface Request {
    user?: IUsers;
  }
}

class Auth {
  constructor() {}

  async authorize(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: "not authorized",
      });
    }

    try {
      const bearerToken = `${headers.authorization}`.split("Bearer ");
      const token = bearerToken[1];
      const userData = await ServiceAuth.validateToken(token);
      const role = userData.role === "superadmin" || userData.role === "admin" ? userData.role : "";

      const isSuperAdminOrAdmin = await ServiceAuth.validateRole(userData, role);
      // console.log(role);

      if (!isSuperAdminOrAdmin) {
        return res.status(403).json({
          data: "not authorized",
        });
      }

      (req as Request).user = userData;

      next();
    } catch (error) {
      res.status(401).json({
        message: "token does not match",
      });
    }
  }

  async authorizeSuperAdmin(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: "not authorized",
      });
    }

    try {
      const bearerToken = `${headers.authorization}`.split("Bearer ");
      const token = bearerToken[1];
      const userData = await ServiceAuth.validateToken(token);

      const isSuperAdmin = await ServiceAuth.validateRole(userData, "superadmin");

      if (!isSuperAdmin) {
        return res.status(403).json({
          data: "not authorized",
        });
      }

      (req as Request).user = userData;

      next();
    } catch (error) {
      res.status(401).json({
        message: "token does not match",
      });
    }
  }

  async authorizeUser(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      return res.status(403).json({
        data: "not authorized",
      });
    }

    try {
      const bearerToken = `${headers.authorization}`.split("Bearer ");
      const token = bearerToken[1];
      const userData = await ServiceAuth.validateToken(token);

      (req as Request).user = userData;

      next();
    } catch (error) {
      res.status(401).json({
        message: "token does not match",
      });
    }
  }
}

export default new Auth();
