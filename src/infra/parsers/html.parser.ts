import fs from 'fs/promises'
import { glob } from 'glob'
import { parse } from 'node-html-parser'
import path from 'path'
import type { ArticleItem } from '@core/article'
import type { Parser } from '@core/parser'

export class HtmlParser implements Parser {
	async parseUserInput(input: string): Promise<ArticleItem[]> {
		try {
			const htmlFiles = await glob(`${path.resolve(input)}/*.html`)
			const promises = htmlFiles.map((file: string) => this.getArticlesURLs(file))
			const contents = await Promise.all(promises)
			return contents.reverse().flat()
		} catch (e) {
			return Promise.reject(e)
		}
	}

	private async getArticlesURLs(file: string): Promise<ArticleItem[]> {
		const fileContents = await fs.readFile(path.resolve(file), 'utf-8')
		const dom = parse(fileContents)
		return dom.querySelectorAll('li').map((item) => {
			const url = item.querySelector('a.h-cite')!.getAttribute('href') as string
			return {
				url,
				id: url.split('-').pop(),
				slug: this.getSlug(url),
				publishedAt: new Date(item.querySelector('.dt-published')!.textContent).toISOString()
			}
		})
	}

	private getSlug(url: string): string {
		return url.replace('https://medium.com/p/', '').split('-').slice(0, -1).join('-')
	}
}
