import translateInteraction from "../../../utilities/translate-interaction"
import { deletePost } from "../../../api/post/delete"
import { commentOnPost, interactWithPost } from "../../../api/post/update"
import formatFormData from "../../../utilities/format-form-data"
import Posts from "./post-component"
import Comment from "./comment"
import toggleCommentField from "../../../utilities/toggle-comment-field"

/**
 * Represents an interactive post web component, extending the `Posts` class
 * to add interactivity such as commenting, reacting, and deleting posts.
 *
 * @class
 * @extends Posts
 */
export default class InteractivePost extends Posts {
  /**
   * Creates an instance of the InteractivePost component.
   *
   * @constructor
   * @param {Object} post - The post data to be displayed in the component.
   * @param {number} post.id - The unique identifier for the post.
   * @param {string} post.title - The title of the post.
   * @param {string} post.body - The body content of the post.
   * @param {Object} post.media - Media object associated with the post.
   * @param {string} post.media.url - URL of the media associated with the post.
   * @param {Object} post._count - Object containing counts related to the post.
   * @param {number} post._count.comments - Number of comments on the post.
   * @param {number} post._count.reactions - Number of reactions to the post.
   * @param {Array<Object>} post.comments - An array of comment objects related to the post.
   * @param {Array<Object>} post.reactions - An array of reaction objects.
   * @param {Object} post.author - The author of the post.
   * @param {string} post.author.name - The name of the post author.
   */
  constructor(post) {
    super(post, true)
    const { comments, reactions, id, author } = post

    // Values
    this.reactions = reactions
    this.shadowRoot.querySelector(".edit-button").href = `/post/edit/?id=${id}`
    this.shadowRoot.querySelector(".author").textContent = `By: ${author.name}`

    // Elements
    this.follow = this.shadowRoot.querySelector(".follow-button")
    this.like = this.shadowRoot.querySelector(".like-button")
    this.lol = this.shadowRoot.querySelector(".lol-button")
    this.toggleButton = this.shadowRoot.querySelector(".toggle-button")
    this.removeButton = this.shadowRoot.querySelector(".delete-btn")
    this.comment = this.shadowRoot.querySelector(".comment_send")
    this.commentsContainer = this.shadowRoot.querySelector(".comment_all")
    this.comments = comments

    // Events
    this.follow.addEventListener("click", () => console.log("followed"))
    this.like.addEventListener("click", () => this.handleInteraction("like"))
    this.lol.addEventListener("click", () => this.handleInteraction("lol"))
    this.toggleButton.addEventListener("click", () => toggleCommentField(this))
    this.removeButton.addEventListener("click", () => this.handleDeletePost())
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
    this.reactions.filter((reaction) => {
      if (
        reaction.reactors.some(
          (user) => user.toLowerCase() === currentUser.toLowerCase()
        )
      ) {
        switch (reaction.symbol) {
          case "😂": {
            this.lol.classList.remove("inactive")
            break
          }
          case "💗": {
            this.like.classList.remove("inactive")
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
      await deletePost(this.dataset.id)
    } catch (e) {
      console.error(e)
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
    const isInteracted = this[interaction].classList.contains("inactive")

    if (isInteracted) {
      this[interaction].classList.remove("inactive")
    } else {
      this[interaction].classList.add("inactive")
    }

    try {
      this[interaction].classList.add("disabled", true)
      const symbol = translateInteraction(interaction)
      await interactWithPost(this.dataset.id, symbol)
    } catch (e) {
      console.error(e)
    } finally {
      this[interaction].classList.remove("disabled", true)
    }
  }
}
if (customElements.get("interactive-post")) {
  console.error("Element has already been registered!")
} else {
  customElements.define("interactive-post", InteractivePost)
}
