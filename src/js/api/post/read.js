import handleApiErrors from "../../utilities/handle-api-errors"
import {
  API_OPTIONS,
  API_SOCIAL_POSTS,
  API_SOCIAL_PROFILES,
} from "../constants"
import cacheDataWithExpiry from "./cache"

function getLocalPosts() {
  if (localStorage.posts) {
    const time = new Date()
    const localPosts = JSON.parse(localStorage.posts)

    if (time.getTime() > localPosts.expiry) {
      console.log("local data has expired! Fetching from server")
      localStorage.removeItem("posts")
      return false
    } else {
      console.log("returning local posts")
      return localPosts
    }
  } else return false
}

export async function readPost(id) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}/?_author=true&_comments=true&_reactions=true`, API_OPTIONS())

  const responseData = await response.json()

  if (response.ok) {
    return responseData
  } else {
    handleApiErrors(responseData)
  }
}

export async function readPosts(limit = 12, page = 1, tag) {
  const localPosts = getLocalPosts()

  if (localPosts) return localPosts

  const tagParam = tag ? `&_tag=${tag}` : ""
  const response = await fetch(
    `${API_SOCIAL_POSTS}?page=${page}&limit=${limit}${tagParam}&_count`,
    API_OPTIONS()
  )

  const responseData = await response.json()

  if (response.ok) {
    cacheDataWithExpiry(responseData, "posts")
    return responseData
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
