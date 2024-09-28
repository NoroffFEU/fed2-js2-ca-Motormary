import handleApiErrors from "../../utilities/handle-api-errors"
import {
  API_OPTIONS,
  API_SOCIAL_POSTS,
  API_SOCIAL_PROFILES,
} from "../constants"
import cacheDataWithExpiry from "./cache"

/**
 * @description Checks if localStorage contains any posts and if they are stale.
 * 
 * @returns {Array} Posts saved in localStorage
 */
function getLocalPosts() {
  if (localStorage.posts) {
    const time = new Date()
    const localPosts = JSON.parse(localStorage.posts)

    // Compare current time against when posts were set to expire.
    if (time.getTime() > localPosts.expiry) {
      localStorage.removeItem("posts")
      return false
    } else {
      return localPosts
    }
  } else return false
}

// ------------------------------

/**
 * @description Fetches a post by ID.
 * 
 * @param {number} id 
 * 
 * @async
 * @returns {Promise<Object>} Returns a single post
 */
export async function readPost(id) {
  const response = await fetch(`${API_SOCIAL_POSTS}/${id}/?_author=true&_comments=true&_reactions=true`, API_OPTIONS())

  const responseData = await response.json()

  if (response.ok) {
    return responseData
  } else {
    handleApiErrors(responseData)
  }
}

// --------------------------------

/**
 * @description Fetches all posts available.
 * 
 * @param {number} limit - Maximum amount of posts per page.
 * @param {number} page  - Number of page.
 * @param {Array<string>} [tag] - Query tags.
 * @returns {Promise<Array<Object>>} A promise containing an array of posts.
 */
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

// -----------------------------------

/**
 * @description Fetch posts created by a specific author.
 * 
 * @param {string} username 
 * @param {number} limit 
 * @param {number} page 
 * @param {Array<string>} [tag]
 * 
 * @returns {Promise<Array<Object>>} Returns promise containing array of posts.
 */
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
