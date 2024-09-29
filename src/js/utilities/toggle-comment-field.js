export default function toggleCommentField(component) {
    const commentContainer = component.shadowRoot.querySelector(".comment_container")
    const isHidden = commentContainer.classList.contains("hidden")

    if (isHidden) {
      commentContainer.classList.remove("hidden")
    } else {
      commentContainer.classList.add("hidden")
    }
  }