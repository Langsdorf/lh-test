import { User } from "models";

const validateNewUser = (user: User) => {
  const checkInputs = Object.values(user).every((x) => x);

  if (!checkInputs)
    return {
      statusCode: 422,
      message: "Nem todos os dados foram preenchidos.",
    };

  if (user.senha.length < 8)
    return { statusCode: 422, message: "Senha curta." };

  if (user.senha !== user.confirmacao_senha)
    return {
      statusCode: 422,
      message: "Senha e confirmação de senha são diferentes.",
    };

  const hasUpperCase = /[A-Z]/.test(user.senha);
  const hasLowerCase = /[a-z]/.test(user.senha);
  const hasNumber = /[0-9]/.test(user.senha);

  if (!hasUpperCase)
    return {
      statusCode: 422,
      message: "Senha não possui uma letra maiúscula.",
    };

  if (!hasLowerCase)
    return {
      statusCode: 422,
      message: "Senha não possui uma letra minúscula.",
    };

  if (!hasNumber)
    return { statusCode: 422, message: "Senha não possui um número." };

  return { statusCode: 100 };
};

export default { validateNewUser };
