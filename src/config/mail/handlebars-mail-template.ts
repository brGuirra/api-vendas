import fs from 'node:fs/promises'
import handlebars from 'handlebars'

export type TemplateVariableProps = Record<string, string | number>

export interface IParseMailTemplate {
	file: string
	variables: TemplateVariableProps
}

export class HandlebarsMailTemplate {
	public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
		const templateFileContent = await fs.readFile(file, 'utf8')

		const parseTemplate = handlebars.compile(templateFileContent)

		return parseTemplate(variables)
	}
}
