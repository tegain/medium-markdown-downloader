import { Nullable } from '../types'
import { slugify } from '../utils/slugify'

export interface ArticleMetadata {
	id: string
	title: string
}

interface WithURL {
	url: string
}

export interface WithID {
	id: string
}

export type ArticleItem = (WithURL | WithID) & {
	slug?: string
	title?: string
}

export class Article {
	constructor(private readonly article: ArticleItem) {}

	getId(): string {
		if (hasID(this.article)) {
			return this.article.id
		}
		return this.article.url.split('-').pop() as string
	}

	getSlug(): Nullable<string> {
		if (this.article.slug) {
			return this.article.slug
		}
		if (this.article.title) {
			return slugify(this.article.title)
		}
		if (hasURL(this.article)) {
			return this.article.url.replace('https://medium.com/p/', '').split('-').slice(0, -1).join('-')
		}
		return null
	}
}

function hasID(article: ArticleItem): article is WithID {
	return article['id'] !== undefined
}

function hasURL(article: ArticleItem): article is WithURL {
	return article['url'] !== undefined
}
