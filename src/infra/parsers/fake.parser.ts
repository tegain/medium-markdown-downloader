import type { ArticleItem } from '@core/article'
import type { Parser } from '@core/parser'
import type { Nullable } from '../../types'

export class FakeParser implements Parser {
	private result: Nullable<ArticleItem[]> = null

	withResult(result: ArticleItem[]): this {
		this.result = result
		return this
	}

	parseUserInput(): Promise<ArticleItem[]> {
		if (!this.result) {
			return Promise.reject('Unable to parse user input')
		}
		return Promise.resolve(this.result)
	}
}
