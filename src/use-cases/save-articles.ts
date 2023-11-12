import { Article, ArticleItem } from '@core/article'
import type { HttpClient } from '@core/http-client'
import type { Parser } from '@core/parser'
import type { Saver } from '@core/saver'
import path from 'path'
import type { Nullable } from '../types'
import { slugify } from '../utils/slugify'

interface SaveArticlesOptions {
	input: string
	outputDirectory: string
}

interface UseCaseParams {
	parser: Parser
	httpClient: HttpClient
	saver: Saver
}

export class SaveMediumArticles {
	private readonly parser: Parser
	private readonly httpClient: HttpClient
	private readonly saver: Saver

	constructor({ parser, httpClient, saver }: UseCaseParams) {
		this.parser = parser
		this.httpClient = httpClient
		this.saver = saver
	}

	async save({ input, outputDirectory }: SaveArticlesOptions): Promise<void> {
		try {
			const articles = await this.parser.parseUserInput(input)
			console.info(`Found ${articles.length} article(s).`)

			const promises = articles.map((article) => this.saveArticle(article, outputDirectory))
			await Promise.allSettled(promises).then((result) => this.logResult(result))
		} catch (e) {
			console.error(e)
			return Promise.reject(e)
		}
	}

	private async saveArticle(articleItem: ArticleItem, outputDirectory: string): Promise<Nullable<string>> {
		const article = new Article(articleItem)
		const articleId = article.getId()
		const fileName = await this.getFileName(article.getSlug(), articleId)
		const outputPath = path.resolve(outputDirectory, fileName)

		if (this.saver.checkIfFileAlreadyExists(outputPath)) {
			console.warn(`File at "${outputPath}" already exists. Skipping download.`)
			return null
		}

		return this.httpClient
			.getArticleById(articleId)
			.then((fileContents) => this.saver.save({ fileName, fileContents, outputDirectory }))
			.then(() => article.getSlug() ?? article.getId())
	}

	private async getFileName(articleSlug: Nullable<string>, articleId: string): Promise<string> {
		if (articleSlug === null) {
			const articleInfos = await this.httpClient.getArticleMetadataById(articleId)
			return `${slugify(articleInfos.title)}.md`
		}
		return `${articleSlug}.md`
	}

	private logResult(results: PromiseSettledResult<Nullable<string>>[]): void {
		results.forEach((result) => {
			if (result['reason']) {
				return console.error('Error saving article:', (result as PromiseRejectedResult).reason)
			}
			if (result['value']) {
				console.log('Successfully saved article:', (result as PromiseFulfilledResult<Nullable<string>>).value)
			}
		})
	}
}
