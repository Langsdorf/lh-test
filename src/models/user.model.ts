export default interface UserModel {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmacao_senha: string;

  [k: string]: any
}
