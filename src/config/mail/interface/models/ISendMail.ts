interface IVariables {
  [key: string]: string | number | undefined
}

interface IParseEmail {
  file: string
  variables: IVariables
}

interface IMailContact {
  name: string
  address: string
}
export interface ISendMail {
  from?: IMailContact
  to: IMailContact
  subject: string
  templateData: IParseEmail
}
