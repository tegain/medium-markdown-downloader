import type { ArticleMetadata } from '@core/article'
import type { HttpClient, ListArticlesResponse } from '@core/http-client'
import type { Nullable } from '../../types'

export interface ArticleSeed {
	id: string
	content: string
}

export interface ListSeed {
	id: string
	articlesIds: string[]
}

export class MemoryHttpClient implements HttpClient {
	private articlesMetaData: Nullable<ArticleMetadata[]> = null
	private articlesItems: Nullable<ArticleSeed[]> = null
	private listsItems: Nullable<ListSeed[]> = null

	withArticlesMetadata(data: ArticleMetadata[]): this {
		this.articlesMetaData = data
		return this
	}

	withArticlesItems(data: ArticleSeed[]): this {
		this.articlesItems = data
		return this
	}

	withListArticlesIds(data: ListSeed[]): this {
		this.listsItems = data
		return this
	}

	getArticleById(id: string): Promise<string> {
		const article = this.articlesItems?.find((x) => x.id === id)
		if (!article) {
			return Promise.reject(`Article with ID "${id}" not found`)
		}
		return Promise.resolve(article.content)
	}

	getArticleMetadataById(id: string): Promise<ArticleMetadata> {
		const articleMetadata = this.articlesMetaData?.find((x) => x.id === id)
		if (!articleMetadata) {
			return Promise.reject(`Unable to find metadata for article with ID "${id}"`)
		}
		return Promise.resolve(articleMetadata)
	}

	getArticlesIdsByListId(listId: string): Promise<ListArticlesResponse> {
		const list = this.listsItems?.find((x) => x.id === listId)
		if (!list) {
			return Promise.reject('Not found')
		}
		return Promise.resolve({ list_articles: list.articlesIds })
	}
}
