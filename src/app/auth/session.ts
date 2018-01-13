export class Session {

  constructor (public token: string, public tokenType: string, public decodedToken: any) {
  }
}
