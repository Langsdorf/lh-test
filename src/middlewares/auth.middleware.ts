import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) {
    res.status(403).end();
    return;
  }

  if (token.startsWith("Bearer ")) token = token.slice(7);

  jwt.verify(token, process.env.JWT_SECRET || "jwt_secret", (err, user) => {
    if (err) {
      res.status(403).end();
      return;
    }

    (req as any).user = user;
    next();
  });
};

export default authenticationMiddleware;
