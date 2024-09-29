import { deleteComment } from "../../../api/post/comment/delete"
import { commentOnPost } from "../../../api/post/update"
import formatFormData from "../../../utilities/format-form-data"
import handleApiErrors from "../../../utilities/handle-api-errors"
import toggleCommentField from "../../../utilities/toggle-comment-field"
import { commentStyle, commentTemp } from "./component-style"

export default class Comment extends HTMLElement {
  constructor(comment, replies = []) {
    super()
    const { body, id, owner, postId } = comment
    const styleEl = document.createElement("style")
    styleEl.innerHTML = commentStyle

    this.attachShadow({ mode: "open" }).append(
      styleEl,
      commentTemp.content.cloneNode(true)
    )

    // Values
    this.dataset.postId = postId
    this.replyToId = id
    this.shadowRoot.querySelector(
      ".comment_author"
    ).textContent = `By: ${owner}`
    this.shadowRoot.querySelector(".comment_body").textContent = body

    // Events
    this.shadowRoot
      .querySelector(".comment_delete_button")
      .addEventListener("click", () => {
        this.remove()
        deleteComment(postId, id)
      })
    this.shadowRoot
      .querySelector(".comment_reply_button")
      .addEventListener("click", () => toggleCommentField(this))
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault()
        event.stopPropagation()
        const formData = formatFormData(event)
        this.handleCommentReply(formData)
      })

    if (replies.length > 0) {
      replies.forEach((reply) => {
        const newReply = new Comment(reply, reply.replies)
        this.shadowRoot.querySelector(".comment_reply").appendChild(newReply)
      })
    }
  }

  async handleCommentReply(formData) {
    const dataWithId = {
      replyToId: this.replyToId,
      ...formData,
    }

    try {
      await commentOnPost(this.dataset.postId, dataWithId)
      window.location.reload()
    } catch (e) {
      handleApiErrors(e)
      console.error(e)
    }
  }
}

customElements.define("custom-comment", Comment)
