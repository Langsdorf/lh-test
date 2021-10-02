import { User } from "models";

export default interface UpdateUserDto extends Partial<User> {
  nome: string;
}
