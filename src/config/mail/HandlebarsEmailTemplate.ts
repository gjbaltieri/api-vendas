import handlebars from 'handlebars'
import fs from 'fs'

interface IVariables {
  [key: string]: string | number | undefined
}

interface IParseEmail {
  file: string
  variables: IVariables
}

export default class HandlebarEmailTemplate {
  public async parse({ file, variables }: IParseEmail): Promise<string> {
    const fileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const parseTemplate = handlebars.compile(fileContent)
    return parseTemplate(variables)
  }
}
