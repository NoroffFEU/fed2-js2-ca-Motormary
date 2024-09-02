import handleApiErrors from "../../../utilities/handle-api-errors"
import { API_OPTIONS, API_SOCIAL_POSTS } from "../../constants"

export async function deleteComment(postId, commentId) {
  console.log(postId, commentId)
  const response = await fetch(
    `${API_SOCIAL_POSTS}/${postId}/comment/${commentId}`,
    API_OPTIONS("DELETE")
  )

  console.log(response)

  if (response.ok) {
    localStorage.removeItem("posts")
} else {
    const responseData = await response.json()
    handleApiErrors(responseData)
    window.location.reload()
    throw new Error(responseData.errors.map((error) => error.message))
  }
}
