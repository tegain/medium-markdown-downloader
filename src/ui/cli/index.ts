import { ListParser } from '@infra/parsers/list.parser'
import { Command } from 'commander'
import { SaveMediumArticles } from '@usecases/save-articles'
import { ApiHttpClient } from '@infra/http-client/api.http-client'
import { HtmlParser } from '@infra/parsers/html.parser'
import { IdsParser } from '@infra/parsers/ids.parser'
import { JsonParser } from '@infra/parsers/json.parser'
import { FileSystemSaver } from '@infra/savers/fs.saver'

const program = new Command()

program.name('mmd').description('Save Medium articles locally in Markdown').version('0.0.1')

program
	.command('html')
	.description('Download Medium articles locally in Markdown from HTML bookmarks')
	.requiredOption('-i, --input  <string>', 'Path to folder containing bookmarks HTML files')
	.option('-o, --output <string>', 'Path to destination folder (default: current directory)', '.')
	.action(async (options) => {
		const useCase = new SaveMediumArticles({
			parser: new HtmlParser(),
			httpClient: new ApiHttpClient(),
			saver: new FileSystemSaver()
		})
		await useCase.save({
			input: options.input,
			outputDirectory: options.output
		})
	})

program
	.command('json')
	.description('Download Medium articles locally in Markdown from a list of URLs in JSON file')
	.requiredOption('-i, --input  <string>', 'Path to JSON file')
	.option('-o, --output <string>', 'Path to destination folder (default: current directory)', '.')
	.action(async (options) => {
		const useCase = new SaveMediumArticles({
			parser: new JsonParser(),
			httpClient: new ApiHttpClient(),
			saver: new FileSystemSaver()
		})
		await useCase.save({
			input: options.input,
			outputDirectory: options.output
		})
	})

program
	.command('ids')
	.description('Download Medium articles locally in Markdown from a list of articles IDs')
	.requiredOption('-i, --input <string>', 'List of articles IDs')
	.option('-o, --output <string>', 'Path to destination folder (default: current directory)', '.')
	.action(async (options) => {
		const useCase = new SaveMediumArticles({
			parser: new IdsParser(),
			httpClient: new ApiHttpClient(),
			saver: new FileSystemSaver()
		})
		await useCase.save({
			input: options.input,
			outputDirectory: options.output
		})
	})

program
	.command('list')
	.description('Download Medium articles locally in Markdown from a reading list ID')
	.requiredOption('-i, --input <string>', 'Reading list ID')
	.option('-o, --output <string>', 'Path to destination folder (default: current directory)', '.')
	.action(async (options) => {
		const httpClient = new ApiHttpClient()
		const useCase = new SaveMediumArticles({
			parser: new ListParser(httpClient),
			httpClient: httpClient,
			saver: new FileSystemSaver()
		})
		await useCase.save({
			input: options.input,
			outputDirectory: options.output
		})
	})

program.showHelpAfterError()
program.parse()
