import { HttpException } from "@core/exceptions";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";

const validationMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => {
              return Object.values(error.constraints!);
            })
            .join(", ");
          next(new HttpException(400, message));
        }
      }
    );
  };
};


export default validationMiddleware;