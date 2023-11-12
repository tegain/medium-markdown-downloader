export interface Saver {
	checkIfFileAlreadyExists(filePath: string): boolean
	save(options: SaverOptions): Promise<void>
}

export interface SaverOptions {
	outputDirectory: string
	fileName: string
	fileContents: string
}
