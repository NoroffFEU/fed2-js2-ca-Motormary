import { updatePost } from "../../api/post/update"
import formatFormData from "../../utilities/format-form-data"

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
