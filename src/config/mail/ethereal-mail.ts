import nodemailer from 'nodemailer'

import {
	HandlebarsMailTemplate,
	IParseMailTemplate,
} from './handlebars-mail-template'

interface IEmailContact {
	name: string
	email: string
}

interface ISendMail {
	to: IEmailContact
	from?: IEmailContact
	subject: string
	templateData: IParseMailTemplate
}

export const EtherealMail = {
	async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMail): Promise<void> {
		const handlebarsMailTemplate = new HandlebarsMailTemplate()
		const account = await nodemailer.createTestAccount()
		const transporter = nodemailer.createTransport({
			host: account.smtp.host,
			port: account.smtp.port,
			secure: account.smtp.secure,
			auth: {
				user: account.user,
				pass: account.pass,
			},
		})

		void transporter
			.sendMail({
				from: {
					name: from?.name || 'Equipe API',
					address: from?.email || 'equipe@apivendas.com',
				},
				to: {
					name: to.name,
					address: to.email,
				},
				subject,
				html: await handlebarsMailTemplate.parse(templateData),
			})
			.then(message => {
				console.log('Message sent: %s', message.messageId)
				console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
			})
	},
}
