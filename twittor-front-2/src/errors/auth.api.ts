export class SignInWrongCredentialsError extends Error {
  constructor() {
    super('Login or password is incorrect.');
  }
}
