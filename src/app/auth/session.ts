export class Session {
  constructor(public username: string, public token: string, public tokenType: string, public expiration: number) {
  }
}
