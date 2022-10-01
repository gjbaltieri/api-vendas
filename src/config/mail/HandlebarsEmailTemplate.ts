import handlebars from 'handlebars'

interface IVariables {
  [key: string]: string | number | undefined
}

interface IParseEmail {
  template: string
  variables: IVariables
}

export default class HandlebarEmailTemplate {
  public async parse({ template, variables }: IParseEmail): Promise<string> {
    const parseTemplate = handlebars.compile(template)
    return parseTemplate(variables)
  }
}
