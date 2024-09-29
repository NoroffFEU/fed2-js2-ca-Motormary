import handleApiErrors from "../../utilities/handle-api-errors"
import { API_KEY, API_OPTIONS, API_SOCIAL_POSTS } from "../constants"

export async function updatePost(id, { title, body, tags, media }) {
  const data = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  }

  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    ...API_OPTIONS("PUT"),
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (response.ok) {
    localStorage.removeItem("posts")
    alert("Post updated successfully")
  } else {
    handleApiErrors(responseData)
  }
}

export async function interactWithPost(id, symbol) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}/react/${symbol}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${localStorage.token}`,
      "X-Noroff-API-Key": API_KEY,
    }
  })

  const responseData = await response.json()

  if (response.ok) {
    localStorage.removeItem("posts")
    return responseData
  } else {
    handleApiErrors(responseData)
  }
}

export async function commentOnPost(id, data) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}/comment`, {
    ...API_OPTIONS("POST"),
    body: JSON.stringify(data)
  })

  const responseData = await response.json()

  if (response.ok) {
    localStorage.removeItem("posts")
    return responseData
  } else {
    handleApiErrors(responseData)
  }
}
