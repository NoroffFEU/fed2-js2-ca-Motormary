import translateInteraction from "../../../utilities/translate-interaction"
import { deletePost } from "../../../api/post/delete"
import { commentOnPost, interactWithPost } from "../../../api/post/update"
import formatFormData from "../../../utilities/format-form-data"
import Posts from "./post-component"
import Comment from "./comment"
import toggleCommentField from "../../../utilities/toggle-comment-field"

export default class InteractivePost extends Posts {
  constructor(post) {
    super(post, true)
    const { comments, reactions } = post

    // Values
    this.reactions = reactions

    // Elements
    this.follow = this.shadowRoot.querySelector(".follow-button")
    this.like = this.shadowRoot.querySelector(".like-button")
    this.lol = this.shadowRoot.querySelector(".lol-button")
    this.toggle = this.shadowRoot.querySelector(".toggle-button")
    this.remove = this.shadowRoot.querySelector(".delete-btn")
    this.comment = this.shadowRoot.querySelector(".comment_send")
    this.commentsContainer = this.shadowRoot.querySelector(".comment_all")
    this.comments = comments

    // Events
    this.follow.addEventListener("click", () => console.log("followed"))
    this.like.addEventListener("click", () => this.handleInteraction("like"))
    this.lol.addEventListener("click", () => this.handleInteraction("lol"))
    this.toggle.addEventListener("click", () => toggleCommentField(this))
    this.remove.addEventListener("click", () => this.handleDeletePost())
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => {
        event.preventDefault()
        const formData = formatFormData(event)
        this.handleComment(formData)
      })

    this.renderReplies()
    this.checkReactions()
  }

  checkReactions() {
    const currentUser = localStorage.username
    this.reactions.filter(reaction => {
      if (reaction.reactors.some(user => user === currentUser)) {
        switch (reaction.symbol) {
          case "😂": {
            this.lol.classList.add("reacted")
            break
          }
          case "💗": {
            this.like.classList.add("reacted")
          }
        }
      }
    })
  }

  renderReplies() {
    const buildCommentTree = (comments, parentId = null) => {
      return comments
        .filter((comment) => comment.replyToId === parentId)
        .map((comment) => ({
          ...comment,
          replies: buildCommentTree(comments, comment.id),
        }))
    }

    const commentTree = buildCommentTree(this.comments)

    commentTree.forEach((comment) => {
      const commentEl = new Comment(comment, comment.replies)
      this.commentsContainer.appendChild(commentEl)
    })
  }

  async handleDeletePost() {
    try {
      this.classList.add("hidden")
      await deletePost(this.dataset.id)
    } catch (e) {
      console.error(e)
      this.classList.remove("hidden")
    }
  }

  async handleComment(formData) {
    try {
      const response = await commentOnPost(this.dataset.id, formData)
      if (response) window.location.reload()
    } catch (e) {
      console.error(e)
    }
  }

  async handleInteraction(interaction) {
    const isInteracted = this[interaction].classList.contains("reacted")

    if (isInteracted) {
      this[interaction].classList.remove("reacted")
    } else {
      this[interaction].classList.add("reacted")
    }

    try {
      this[interaction].classList.add("disabled", true)
      const symbol = translateInteraction(interaction)
      const response = await interactWithPost(this.dataset.id, symbol)
    } catch (e) {
      console.error(e)
    } finally {
      this[interaction].classList.remove("disabled", true)
    }
  }
}

customElements.define("single-post", InteractivePost)
