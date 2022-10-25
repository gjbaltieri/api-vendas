import nodemailer from 'nodemailer'
import HandlebarEmailTemplate from './HandlebarsEmailTemplate'

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
interface ISendMail {
  from?: IMailContact
  to: IMailContact
  subject: string
  templateData: IParseEmail
}
export default class EtherealMail {
  static async sendMail({ from, to, subject, templateData }: ISendMail): Promise<any> {
    const account = await nodemailer.createTestAccount()
    const mailTemplate = new HandlebarEmailTemplate()
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    })
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.address || 'suporte@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.address,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    })
    const { messageId } = message
    const messageLink = nodemailer.getTestMessageUrl(message)
    return { messageId, messageLink }
  }
}
