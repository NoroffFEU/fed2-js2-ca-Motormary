import { deletePost } from "../../api/post/delete"

/**
 * @description Handles the deletion of a post when triggered by a button click event.
 * Disables the button while the deletion process is in progress to prevent multiple submissions.
 *
 * @async
 * @function onDeletePost
 * @param {Event} event - The event object triggered by the delete action.
 * @returns {Promise<void>} Returns an empty promise.
 */
export async function onDeletePost(event) {
  event.preventDefault()
  const button = document.querySelector("#delete")

  const postId = button.dataset.id

  try {
    button.setAttribute("disabled", true)
    await deletePost(postId)
  } catch (e) {
    console.error(e)
  } finally {
    button.removeAttribute("disabled")
  }
}
