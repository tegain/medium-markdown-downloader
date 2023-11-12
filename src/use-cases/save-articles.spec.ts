import { ArticleMetadata } from '@core/article'
import { Parser } from '@core/parser'
import { ArticleSeed, MemoryHttpClient } from '@infra/http-client/memory.http-client'
import { FakeParser } from '@infra/parsers/fake.parser'
import { IdsParser } from '@infra/parsers/ids.parser'
import { MemorySaver } from '@infra/savers/memory.saver'
import { SaveMediumArticles } from '@usecases/save-articles'

describe('UseCase: Saving articles', () => {
	let useCase: SaveMediumArticles
	let parser: Parser
	let httpClient: MemoryHttpClient
	let saver: MemorySaver

	beforeEach(() => {
		httpClient = new MemoryHttpClient()
		saver = new MemorySaver()
	})

	describe('Given a user input', () => {
		describe('And articles items have slug or title', () => {
			it('saves articles', async () => {
				parser = new FakeParser().withResult([
					{
						id: 'f7z2opiui9',
						slug: 'intro-to-springboot-3-with-kotlin'
					},
					{
						url: 'https://medium.com/p/introducing-angular-v-17-q5f2vnxz54',
						title: 'introducing-angular-v-17'
					}
				])
				useCase = new SaveMediumArticles({ parser, httpClient, saver })

				httpClient.withArticlesItems(seedFakeArticleItems())
				const userInput = 'any_input_overriden_by_fake_parser'
				const outputDirectory = '/articles/saved'
				await useCase.save({ input: userInput, outputDirectory })
				expect(saver.getFilesPaths()).toEqual([
					'/articles/saved/intro-to-springboot-3-with-kotlin.md',
					'/articles/saved/introducing-angular-v-17.md'
				])
			})
		})

		describe('And articles items only have minimum ID information', () => {
			it('retrieves articles metadata and saves articles', async () => {
				parser = new IdsParser()
				useCase = new SaveMediumArticles({ parser, httpClient, saver })

				httpClient.withArticlesItems(seedFakeArticleItems()).withArticlesMetadata(seedFakeArticleMetadata())
				const userInput = 'f7z2opiui9,q5f2vnxz54,wg8of2ipyp'
				const outputDirectory = '/articles/saved'
				await useCase.save({ input: userInput, outputDirectory })
				expect(saver.getFilesEntries()).toEqual([
					['/articles/saved/intro-to-springboot3.md', '# Intro to SpringBoot3 with Kotlin: Part 2 -Controllers & Routing'],
					['/articles/saved/introducing-angular-v17.md', '# Introducing Angular v17\n## Last month marked the lorem ipsum dolor'],
					['/articles/saved/angular-css.md', '# The [New] State of CSS in Angular']
				])
			})
		})

		describe('And one request fails', () => {
			it('saves successful articles and logs errors', async () => {
				parser = new IdsParser()
				useCase = new SaveMediumArticles({ parser, httpClient, saver })
				jest.spyOn(console, 'error')

				httpClient.withArticlesItems(seedFakeArticleItems()).withArticlesMetadata(seedFakeArticleMetadata())
				const userInput = 'f7z2opiui9,q5f2vnxz54,incorrect_id'
				const outputDirectory = '/articles/saved'
				await useCase.save({ input: userInput, outputDirectory })
				expect(saver.getFilesEntries()).toEqual([
					['/articles/saved/intro-to-springboot3.md', '# Intro to SpringBoot3 with Kotlin: Part 2 -Controllers & Routing'],
					['/articles/saved/introducing-angular-v17.md', '# Introducing Angular v17\n## Last month marked the lorem ipsum dolor']
				])
				expect(console.error).toHaveBeenCalledWith(
					'Error saving article:',
					'Unable to find metadata for article with ID "incorrect_id"'
				)
			})
		})
	})
})

function seedFakeArticleItems(): ArticleSeed[] {
	return [
		{
			id: 'f7z2opiui9',
			content: '# Intro to SpringBoot3 with Kotlin: Part 2 -Controllers & Routing'
		},
		{
			id: 'q5f2vnxz54',
			content: '# Introducing Angular v17\n## Last month marked the lorem ipsum dolor'
		},
		{
			id: 'wg8of2ipyp',
			content: '# The [New] State of CSS in Angular'
		}
	]
}

function seedFakeArticleMetadata(): ArticleMetadata[] {
	return [
		{ id: 'f7z2opiui9', title: 'Intro to SpringBoot3' },
		{ id: 'q5f2vnxz54', title: 'Introducing Angular v17' },
		{ id: 'wg8of2ipyp', title: 'Angular CSS' }
	]
}
