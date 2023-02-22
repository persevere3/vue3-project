export interface ILogin_form {
  account: string,
  password: string
}

export class Init_data {
  login_form: ILogin_form = {
    account: '',
    password: ''
  }
}