import userFile from "json/user.json";
import { User } from "models";
import { UpdateUserObject } from "interfaces";
import { UserValidation } from "validations";
import { MAX_RESULTS, MAX_RESULTS_PER_PAGE } from "options/constants";

import { writeFileSync } from "fs";

const createUser = (user: User) => {
  const { statusCode, message } = UserValidation.validateNewUser(user);

  if (statusCode !== 100) return { statusCode, message, data: user };

  (userFile.users as User[]).push(user);

  writeFileSync("src/json/user.json", JSON.stringify(userFile), "utf-8");

  return {
    statusCode: 201,
    message: "Usuário criado",
    data: user,
  };
};

const getUser = (email: string) => {
  const user: User | undefined = userFile.users.find(
    (u: User) => u.email === email
  );

  return {
    statusCode: user ? 200 : 404,
    message: user ? "OK" : `Usuário ${email} não encontrado.`,
    data: user ? user : null,
  };
};

const updateUser = (newUser: UpdateUserObject) => {
  const user: User | undefined = userFile.users.find(
    (u: User) => u.email === newUser.email
  );

  if (!user)
    return {
      statusCode: 404,
      message: `Usuário ${newUser.email} não encontrado.`,
      data: newUser,
    };

  Object.assign(user, newUser);

  writeFileSync("src/json/user.json", JSON.stringify(userFile), "utf-8");

  return {
    statusCode: 200,
    message: "Usuário atualizado.",
    data: user,
  };
};

const getUsers = (page: number) => {
  const max = MAX_RESULTS(page);
  const users: User[] = userFile.users.slice(
    max,
    max === 0 ? MAX_RESULTS_PER_PAGE : max === 0 ? -1 : max * page
  );

  return {
    statusCode: 200,
    message: "OK",
    data: users,
  };
};

export default { createUser, getUser, updateUser, getUsers };
