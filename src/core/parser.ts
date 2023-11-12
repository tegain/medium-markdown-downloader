import type { ArticleItem } from './article'

export interface Parser {
	parseUserInput(input: string): Promise<ArticleItem[]>
}
