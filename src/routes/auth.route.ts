import { AuthController } from "controllers";
import { Router } from "express";

const router = Router();

/**
 * Realizar login
 */
router.post("/", async (req, res) => {
  const response = await AuthController.login(req);

  return res.status(response.statusCode).json(response);
});

export default router;
