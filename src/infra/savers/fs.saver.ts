import fsSync from 'fs'
import fs from 'fs/promises'
import path from 'path'
import type { Saver, SaverOptions } from '@core/saver'

export class FileSystemSaver implements Saver {
	async save({ outputDirectory, fileContents, fileName }: SaverOptions): Promise<void> {
		if (!fsSync.existsSync(outputDirectory)) {
			fsSync.mkdirSync(outputDirectory, { recursive: true })
		}
		const outputPath = path.resolve(outputDirectory, fileName)
		await fs.writeFile(outputPath, fileContents, 'utf-8')
	}

	checkIfFileAlreadyExists(filePath: string): boolean {
		return fsSync.existsSync(filePath)
	}
}
