import express from "express";
import bodyParser from "body-parser";
import { UserRouter, AuthRouter } from "routes";

const app = express();
app.use(bodyParser.json());

app.use("/user", UserRouter);
app.use("/auth", AuthRouter);

app.all("*", (req: express.Request, res: express.Response) => {
  res.status(404).json({
    statusCode: 404,
    message: `${req.path} not found`,
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Servidor back-end iniciado na porta ${process.env.PORT || 3001}`
  );
});
