import { styleData, interactivePostTemp, postTemplate } from "./component-style"

export default class Posts extends HTMLElement {
  constructor(post, interactive = false) {
    super()
    const {id, title, body} = post
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
    this.shadowRoot.querySelector(".body").textContent = body ?? "Body"
    this.shadowRoot.querySelector(".comments-count").textContent = `Comments: ${post._count.comments}`
    this.shadowRoot.querySelector(".reactions-count").textContent = `Reactions: ${post._count.reactions}`
  }
}

customElements.define("post-card", Posts)
