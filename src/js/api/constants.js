// Use Postman, or JavaScript to get your API key

import { headers } from "./headers"

// In Workflow we will learn how to secure this information
export const API_KEY = "235c15a7-c0f5-4925-b6ec-59e3f4e2d081"

export const API_BASE = "https://v2.api.noroff.dev"

export const API_AUTH = `${API_BASE}/auth`

export const API_AUTH_LOGIN = `${API_AUTH}/login`

export const API_AUTH_REGISTER = `${API_AUTH}/register`

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`

export const API_SOCIAL = `${API_BASE}/social`

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`

export const API_OPTIONS = (type = "GET") => {
  const options = {
    method: type,
    headers: headers(),
  }

  return options
}
