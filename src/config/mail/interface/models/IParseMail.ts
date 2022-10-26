interface IVariables {
  [key: string]: string | number | undefined
}

export interface IParseMail {
  file: string
  variables: IVariables
}
