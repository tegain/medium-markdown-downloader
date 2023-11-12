export const CONFIG = {
	apiKey: process.env.API_KEY,
	apiHost: process.env.API_HOST,
	apiBaseUrl: process.env.API_BASE_URL
} as const satisfies Record<string, keyof NodeJS.ProcessEnv>
