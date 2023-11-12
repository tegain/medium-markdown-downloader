import fs from 'fs/promises'
import path from 'path'
import type { ArticleItem } from '@core/article'
import type { Parser } from '@core/parser'

export class JsonParser implements Parser {
	async parseUserInput(input: string): Promise<ArticleItem[]> {
		try {
			const fileContents = await fs.readFile(path.resolve(input), 'utf-8')
			return JSON.parse(fileContents)
		} catch (e) {
			return Promise.reject(e)
		}
	}
}
