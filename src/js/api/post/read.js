import handleApiErrors from "../../utilities/handle-api-errors"
import {
  API_OPTIONS,
  API_SOCIAL_POSTS,
  API_SOCIAL_PROFILES,
} from "../constants"

export async function readPost(id) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, API_OPTIONS())

  const responseData = await response.json()

  if (response.ok) {
    console.log(responseData)
  } else {
    handleApiErrors(responseData)
  }
}

export async function readPosts(limit = 12, page = 1, tag) {
  const tagParam = tag ? `&_tag=${tag}` : ""
  const response = await fetch(
    `${API_SOCIAL_POSTS}?page=${page}&limit=${limit}${tagParam}`,
    API_OPTIONS()
  )

  const responseData = await response.json()

  if (response.ok) {
    console.log(responseData)
  } else {
    handleApiErrors(responseData)
  }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const tags = tag ? `&_tag=${tag}` : ""
  const response = await fetch(
    `${API_SOCIAL_PROFILES}/${username}/posts?page=${page}&limit=${limit}${tags}`,
    API_OPTIONS()
  )

  const responseData = await response.json()

  if (response.ok) {
    console.log(responseData)
  } else {
    handleApiErrors(responseData)
  }
}
