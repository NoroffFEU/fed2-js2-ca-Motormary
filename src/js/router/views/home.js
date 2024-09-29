import { readPosts } from "../../api/post/read"
import { authGuard } from "../../utilities/authGuard"
import Posts from "../../ui/post/components/post-component"

authGuard()

async function populatePosts() {
  const container = document.querySelector("main")
  const allPosts = await readPosts()

  allPosts.data.forEach(post => {
    const postCard = new Posts(post)
    container.appendChild(postCard)
  })
}

populatePosts()