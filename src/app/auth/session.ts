export class Session {
  constructor(public token: string, public tokenType: string, public expiration: number) {
  }
}
