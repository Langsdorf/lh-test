import { User } from "models";
import userFile from "json/user.json";
import jwt from "jsonwebtoken";

const login = async (
  partialUser: Partial<User>
): Promise<{
  statusCode: number;
  message: string;
  data: any;
}> => {
  const user: User | undefined = userFile.users.find(
    (user) => user.email === partialUser.email
  );

  //É melhor mostrar o mesmo aviso caso o usuário não seja encontrado ou a senha esteja incorreta
  if (!user || partialUser.senha !== user.senha)
    return {
      statusCode: 404,
      message: `Usuário ${partialUser.email} não encontrado.`,
      data: partialUser,
    };

  const userClone: Partial<User> = { ...user };

  //Evitar que esses dados sejam passados no token
  delete userClone.senha;
  delete userClone.confirmacao_senha;

  const sign = () => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        userClone,
        process.env.JWT_SECRET || "jwt_secret",
        { expiresIn: "3m" },
        (err, token) => {
          if (err)
            return reject({
              statusCode: 500,
              message: `Erro interno.`,
              data: partialUser,
            });

          resolve({
            statusCode: 200,
            message: `OK.`,
            data: token,
          });
        }
      );
    });
  };

  const res = await sign();

  return res as any;
};

export default { login };
