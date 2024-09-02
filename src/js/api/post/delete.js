import handleApiErrors from "../../utilities/handle-api-errors"
import { API_OPTIONS, API_SOCIAL_POSTS } from "../constants"

export async function deletePost(id) {
  const response = await fetch(
    `${API_SOCIAL_POSTS}/${id}`,
    API_OPTIONS("DELETE")
  )

  if (response.ok) {
    localStorage.removeItem("posts")
    if (window.location.pathname === "/") return
    else window.location.href = "/"
  } else {
    const responseData = await response.json()
    handleApiErrors(responseData)
    throw new Error(responseData.errors.map(error => error.message))
  }
}
