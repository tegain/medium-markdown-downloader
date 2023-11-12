export function toCommaSeparatedList(value: string): string[] {
	return value.split(',').map((s) => s.trim())
}
