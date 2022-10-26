import handlebars from 'handlebars'
import fs from 'fs'
import { IParseMail } from './interface/models/IParseMail'

export default class HandlebarEmailTemplate {
  public async parse({ file, variables }: IParseMail): Promise<string> {
    const fileContent = await fs.promises.readFile(file, { encoding: 'utf-8' })
    const parseTemplate = handlebars.compile(fileContent)
    return parseTemplate(variables)
  }
}
