import { Route } from "@core/interfaces";
import { validationMiddleware } from "@core/middleware";
import { ApiConst } from "@core/utils";
import { Router } from "express";
import RegisterDto from "./dtos/register.dto";
import UserController from "./user.controller";

export default class UserRoute implements Route {
  public path = "/";
  public router = Router();

  public userController = new UserController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      this.path + ApiConst.API_USER_REGISTER,
      validationMiddleware(RegisterDto, true),
      this.userController.register
    ); // http://localhost:5001/api/users/register
  }
}
