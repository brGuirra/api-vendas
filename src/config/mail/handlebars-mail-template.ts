import handlebars from 'handlebars'

export type TemplateVariableProps = Record<string, string | number>

export interface IParseMailTemplate {
	template: string
	variables: TemplateVariableProps
}

export class HandlebarsMailTemplate {
	public async parse({
		template,
		variables,
	}: IParseMailTemplate): Promise<string> {
		const parseTemplate = handlebars.compile(template)
		console.log(template)
		console.log(variables)

		return parseTemplate(variables)
	}
}
