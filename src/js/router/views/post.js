import { readPost } from "../../api/post/read"
import InteractivePost from "../../ui/post/components/interactive-post-component"
import { authGuard } from "../../utilities/authGuard"

authGuard()

const url = new URL(window.location.href)
const container = document.querySelector("main")
const params = url.searchParams

async function populatePost() {
  const post = await readPost(params.get("id"))

  const postCard = new InteractivePost(post.data)
  container.appendChild(postCard)
}

populatePost()
