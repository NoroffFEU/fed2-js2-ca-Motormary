import { API_OPTIONS, API_SOCIAL_PROFILES } from "../constants"

export async function readProfile(username) {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, API_OPTIONS())

    const responseData = await response.json()
  
    if (response.ok) {
      console.log(responseData)
    } else {
      handleApiErrors(responseData)
    }
}

export async function readProfiles(limit = 12, page = 1) {
    const response = await fetch(`${API_SOCIAL_PROFILES}?limit=${limit}&page=${page}}`, API_OPTIONS())

    const responseData = await response.json()
  
    if (response.ok) {
      console.log(responseData)
    } else {
      handleApiErrors(responseData)
    }
}
