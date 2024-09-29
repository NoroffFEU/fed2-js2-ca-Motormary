import { API_SOCIAL_PROFILES } from "../constants"

export async function updateProfile(username, { avatar, banner }) {
    const data = {
        avatar: avatar,
        banner: banner
      }
    
      const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
        ...API_OPTIONS("PUT"),
        body: JSON.stringify(data),
      })
    
      const responseData = await response.json()
    
      if (response.ok) {
        alert("Profile updated successfully")
      } else {
        handleApiErrors(responseData)
      }
}
