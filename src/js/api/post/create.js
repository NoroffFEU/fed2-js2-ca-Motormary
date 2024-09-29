import handleApiErrors from "../../utilities/handle-api-errors"
import { API_OPTIONS, API_SOCIAL_POSTS } from "../constants"

/**
 * @description Handles creating a post.
 * 
 * @param {Object} post - Post object.
 * @param {string} post.title - Title of the post.
 * @param {string} post.body - Body of the post.
 * @param {Array.<string>} [post.tags] - Tags describing the post.
 * 
 * @async
 * @returns {Promise<void>} Returns empty promise.
 */
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
    localStorage.removeItem("posts")
    alert("Post created successfully")
  } else {
    handleApiErrors(responseData)
  }
}
