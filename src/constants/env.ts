// export const API_URL = import.meta.env.VITE_API_URL

let ENV_API_URL = import.meta.env.VITE_API_URL

export function setEnvApiUrl(url: string) {
  ENV_API_URL = url
}

export { ENV_API_URL as API_URL }
