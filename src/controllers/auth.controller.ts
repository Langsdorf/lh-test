import { Request } from "express";
import { User } from "models";
import { AuthService } from "services";

const login = (req: Request) => {
  const partialUser: Partial<User> = {
    email: req.body.email,
    senha: req.body.senha,
  };

  return AuthService.login(partialUser);
};

export default { login };
