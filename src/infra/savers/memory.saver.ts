import { Saver, SaverOptions } from '@core/saver'

type FilePath = string
type FileContent = string

export class MemorySaver implements Saver {
	private files = new Map<FilePath, FileContent>()

	getFilesPaths(): FilePath[] {
		return [...this.files.keys()]
	}

	getFilesEntries(): Array<[FilePath, FileContent]> {
		return [...this.files.entries()]
	}

	checkIfFileAlreadyExists(filePath: string): boolean {
		console.log('exists', filePath, this.files.has(filePath))
		return this.files.has(filePath)
	}

	save({ fileName, fileContents, outputDirectory }: SaverOptions): Promise<void> {
		const filePath = `${outputDirectory}/${fileName}`
		this.files.set(filePath, fileContents)
		return Promise.resolve(undefined)
	}
}
