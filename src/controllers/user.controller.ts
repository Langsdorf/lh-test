import { Request } from "express";
import { User } from "models";
import { UserService } from "services";

const createUser = (req: Request) => {
  const user: User = {
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    senha: req.body.senha,
    confirmacao_senha: req.body.confirmacao_senha,
  };

  return UserService.createUser(user);
};

const getUser = (req: Request) => {
  const { email } = req.params;

  return UserService.getUser(email);
};

const updateUser = (req: Request) => {
  const user: User = {
    email: req.params.email,
    nome: req.body.nome,
    telefone: req.body.telefone,
    senha: req.body.senha,
    confirmacao_senha: req.body.confirmacao_senha,
  };

  Object.keys(user).forEach((k) => user[k] === undefined && delete user[k]);

  return UserService.updateUser(user);
};

const getUsers = (req: Request) => {
  let { page }: { page: number } = req.query as any;

  if (!page || page <= 0) page = 1;

  return UserService.getUsers(page);
};

export default { createUser, getUser, updateUser, getUsers };
