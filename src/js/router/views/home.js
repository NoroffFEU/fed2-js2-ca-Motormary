import { readPosts } from "../../api/post/read"
import { authGuard } from "../../utilities/authGuard"
import Posts from "../../ui/post/component"

authGuard()

async function populatePosts() {
  const container = document.querySelector("main")
  const allPosts = await readPosts()

  allPosts.data.forEach(post => {
    const postCard = new Posts(post.id, post.title, post.body, post["_count"])
    container.appendChild(postCard)
  })
}

populatePosts()