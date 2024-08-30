import { readPosts } from "../../api/post/read"
import { authGuard } from "../../utilities/authGuard"

authGuard()


async function populatePosts() {
  const posts = await readPosts()
}

populatePosts()
