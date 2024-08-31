import { deletePost } from "../../api/post/delete"

const template = document.createElement("template")
const styleData = `
:host {
    display: block;
    border: solid 1px #6363;
    border-radius: 6px;
}

.post-card {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    padding: 1.5rem;
}

.title {
    font-weight: bold;
    font-size: 1.25rem;
    margin: 0;
}

.interactions {
    display: flex;
    flex-wrap: none;
    gap: 0.5rem;
    border-top: 1px solid #6363;
    padding-top: 0.5rem;
}

.follow-btn {
    max-width: fit-content;
}
`
template.innerHTML = `
  <div class="post-card">
    <button class="follow-btn" title="Follow">⭐</button>
    <a class="title"></a>
    <p class="body"></p>
    <div class="interactions">
        <button title="Like">👍</button>
        <button title="LOL">😂</button>
        <button title="Delete" class="delete-btn">❌</button>
    </div>
  </div>
`

export default class Posts extends HTMLElement {
  constructor(id, title, body, interactions, author) {
    super()
    const styleEl = document.createElement("style")
    styleEl.innerHTML = styleData

    this.attachShadow({ mode: "open" }).append(styleEl, template.content.cloneNode(true))

    this.dataset.id = id
    this.shadowRoot
      .querySelector(".delete-btn")
      .addEventListener("click", () => this.deleteCurrentPost())
    this.shadowRoot.querySelector(".title").textContent = title ?? "Title"
    this.shadowRoot.querySelector(".body").textContent = body ?? "Body"
  }

  async deleteCurrentPost() {
    try {
      this.classList.add("hidden")
      await deletePost(this.dataset.id)
    } catch (e) {
      console.error(e)
      this.classList.remove("hidden")
    }
  }
}

customElements.define("post-card", Posts)
