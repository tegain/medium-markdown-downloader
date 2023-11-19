// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function take<T extends any[]>(source: T, nbOfItems: number): T {
	if (!(Array.isArray(source) && source !== null && source.length) || isNaN(nbOfItems)) {
		return [] as unknown as T
	}
	return source.slice(0, Number(nbOfItems) || source.length) as T
}
