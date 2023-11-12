import type { ArticleItem } from '@core/article'
import type { Parser } from '@core/parser'
import { toCommaSeparatedList } from '../../utils/string-to-list'

export class IdsParser implements Parser {
	async parseUserInput(input: string): Promise<ArticleItem[]> {
		try {
			return toCommaSeparatedList(input).map((articleId) => ({
				id: articleId
			}))
		} catch (err) {
			return Promise.reject(err)
		}
	}
}
