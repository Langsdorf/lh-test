import { UserController } from "controllers";
import { Router } from "express";
import { AuthenticationMiddleware } from "middlewares";

const router = Router();

/**
 * Criar usuário
 */
router.post("/", (req, res) => {
  const response = UserController.createUser(req);

  return res.status(response.statusCode).json(response);
});

/**
 * Ver um usuário'1
 */
router.get("/:email", AuthenticationMiddleware, (req, res) => {
  const response = UserController.getUser(req);

  return res.status(response.statusCode).json(response);
});

/**
 * Editar usuário
 */
router.patch("/:email", AuthenticationMiddleware, (req, res) => {
  const response = UserController.updateUser(req);

  return res.status(response.statusCode).json(response);
});

/**
 * Listagem de usuários
 */
router.get("/", AuthenticationMiddleware, (req, res) => {
  const response = UserController.getUsers(req);

  return res.status(response.statusCode).json(response);
});

export default router;