import type { ArticleMetadata } from './article'

export interface MarkdownResponse {
	markdown: string
}

export interface ListArticlesResponse {
	list_articles: string[]
}

export interface HttpClient {
	getArticleById(id: string): Promise<string>
	getArticleMetadataById(id: string): Promise<ArticleMetadata>
	getArticlesIdsByListId(listId: string): Promise<ListArticlesResponse>
}
