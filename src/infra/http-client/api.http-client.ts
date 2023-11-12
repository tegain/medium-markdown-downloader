import type { ArticleMetadata } from '@core/article'
import type { HttpClient, ListArticlesResponse, MarkdownResponse } from '@core/http-client'
import { CONFIG } from '../../config'

const REQUEST_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': CONFIG.apiKey,
		'X-RapidAPI-Host': CONFIG.apiHost
	}
}

export class ApiHttpClient implements HttpClient {
	async getArticleById(id: string): Promise<string> {
		try {
			const response = await this.makeRequest<MarkdownResponse>(`/article/${id}/markdown`)
			return response.markdown
		} catch (error) {
			return Promise.reject(error)
		}
	}

	async getArticleMetadataById(id: string): Promise<ArticleMetadata> {
		try {
			return await this.makeRequest<ArticleMetadata>(`/article/${id}`)
		} catch (error) {
			console.error(error)
			return Promise.reject(error)
		}
	}

	async getArticlesIdsByListId(listId: string): Promise<ListArticlesResponse> {
		try {
			return await this.makeRequest<ListArticlesResponse>(`/list/${listId}/articles`)
		} catch (error) {
			console.error(error)
			return Promise.reject(error)
		}
	}

	private async makeRequest<T>(url: string): Promise<T> {
		const response = await fetch(`${CONFIG.apiBaseUrl}${url}`, REQUEST_OPTIONS)
		return (await response.json()) as T
	}
}
