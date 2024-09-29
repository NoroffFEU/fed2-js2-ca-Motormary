import { updatePost } from "../../api/post/update"
import formatFormData from "../../utilities/format-form-data"

/**
 * @description Handles the update of a post when triggered by a form submission event.
 * Disables the update button while the update process is in progress to prevent multiple submissions.
 *
 * @async
 * @function onUpdatePost
 * @param {Event} event - The event object triggered by the form submission.
 * @returns {Promise<void>} Returns an empty promise.
 */
export async function onUpdatePost(event) {
  event.preventDefault()
  const button = document.querySelector("#edit")
  const url = new URL(window.location.href)
  const postId = url.searchParams.get("id")

  const formData = formatFormData(event)

  try {
    button.setAttribute("disabled", true)
    await updatePost(postId, formData)
  } catch (e) {
    console.error(e)
  } finally {
    button.removeAttribute("disabled")
  }
}
