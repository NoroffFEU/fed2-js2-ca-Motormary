import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.forms.createPost;

// Preview media for post in a container
const mediaPreview = document.getElementById("mediaPreview")
form.media.addEventListener("keyup", (event) => mediaPreview.src = event.target.value)

form.addEventListener("submit", onCreatePost);
