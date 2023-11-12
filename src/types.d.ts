declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_KEY: string
			API_HOST: string
			API_BASE_URL: string
		}
	}
}

export type Nullable<T> = null | T
