import handleApiErrors from "../../utilities/handle-api-errors"
import { API_KEY, API_SOCIAL_POSTS } from "../constants"

export async function createPost({ title, body, tags, media }) {
  const data = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  }

  const response = await fetch(API_SOCIAL_POSTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.token}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (response.ok) {
    // redirect
  } else {
    handleApiErrors(responseData)
  }
}
