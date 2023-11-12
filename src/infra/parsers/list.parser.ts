import type { ArticleItem } from '@core/article'
import type { HttpClient } from '@core/http-client'
import type { Parser } from '@core/parser'

export class ListParser implements Parser {
	constructor(private readonly httpClient: HttpClient) {}

	async parseUserInput(listId: string): Promise<ArticleItem[]> {
		const listArticles = await this.httpClient.getArticlesIdsByListId(listId)
		return listArticles.list_articles.map((articleId) => ({ id: articleId }))
	}
}
