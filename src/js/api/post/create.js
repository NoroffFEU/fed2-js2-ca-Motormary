import handleApiErrors from "../../utilities/handle-api-errors"
import { API_KEY, API_OPTIONS, API_SOCIAL_POSTS } from "../constants"

export async function createPost({ title, body, tags, media }) {
  const data = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  }

  const response = await fetch(API_SOCIAL_POSTS, {
    ...API_OPTIONS("POST"),
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (response.ok) {
    alert("Post created successfully")
  } else {
    handleApiErrors(responseData)
  }
}
