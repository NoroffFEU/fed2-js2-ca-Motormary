import { styleData, interactivePostTemp, postTemplate } from "./component-style"

/**
 * Represents a custom web component for displaying a post card.
 * This class extends `HTMLElement` and is used to display post information with optional interactivity.
 *
 * @class
 * @extends HTMLElement
 */
export default class Posts extends HTMLElement {
  /**
   * Creates an instance of the Posts component.
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
   * @param {boolean} [interactive=false] - Determines whether the component should be interactive.
   */
  constructor(post, interactive = false) {
    super()
    const { id, title, body, media } = post
    const styleEl = document.createElement("style")
    styleEl.innerHTML = styleData

    this.attachShadow({ mode: "open" }).append(
      styleEl,
      (interactive ? interactivePostTemp : postTemplate).content.cloneNode(true)
    )

    // Values
    this.dataset.id = id
    this.shadowRoot.querySelector(".post-card").href = `/post/?id=${id}`
    this.shadowRoot.querySelector(".title").textContent = title ?? "Title"
    this.shadowRoot.querySelector("img").src =
      media?.url ?? "/images/noroff-logo.png"
    this.shadowRoot.querySelector(".body").textContent = body ?? "Body"
    this.shadowRoot.querySelector(
      ".comments-count"
    ).textContent = `Comments: ${post._count.comments}`
    this.shadowRoot.querySelector(
      ".reactions-count"
    ).textContent = `Reactions: ${post._count.reactions}`
  }
}

customElements.define("post-card", Posts)
