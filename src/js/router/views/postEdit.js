import { readPost } from "../../api/post/read"
import { onUpdatePost } from "../../ui/post/update"
import { authGuard } from "../../utilities/authGuard"
import handleApiErrors from "../../utilities/handle-api-errors"

authGuard()

const form = document.forms.editPost

form.addEventListener("submit", onUpdatePost)

const url = new URL(window.location.href)
const params = url.searchParams

async function populatePost() {
  try {
    const post = await readPost(params.get("id"))
    form.title.value = post.data.title ?? ""
    form.body.value = post.data.body ?? ""
  } catch (e) {
    console.error(e)
    handleApiErrors(e)
  }
}

populatePost()
