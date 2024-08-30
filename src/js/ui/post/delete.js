import { deletePost } from "../../api/post/delete"

export async function onDeletePost(event) {
  event.preventDefault()
  const button = document.querySelector("#delete")

  const postId = button.dataset.id //TODO: Set post ID to the attribute "data-id" on delete post button

  try {
    button.setAttribute("disabled", true)
    await deletePost(postId)
  } catch (e) {
    console.error(e)
  } finally {
    button.removeAttribute("disabled")
  }
}
