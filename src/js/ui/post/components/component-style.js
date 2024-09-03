export const postTemplate = document.createElement("template")
export const interactivePostTemp = document.createElement("template")
export const commentTemp = document.createElement("template")
export const commentStyle = `
.comment_uniq {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  border-radius: 6px;
  box-shadow: -1px 5px 3px #6363;
}

.comment_author {
  font-weight: bold;
}

.comment_reply_button, 
.comment_delete_button {
  max-width: fit-content;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #636363;
}

.comment_reply {
  /* border-left: solid 3px #6363; */
  border-radius: 6px;
  margin: 0.5rem 0.5rem 0 0.5rem;
}

.comment_container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hidden {
  display: none;
}

`

export const styleData = `
:host {
    display: block;
    border: solid 1px #6363;
    border-radius: 6px;
}

.post-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.5rem;
    color: inherit;
    text-decoration: none;
}

.post-card button:not(.comment_send) {
  background-color: transparent;
  border-radius: 50%;
  aspect-ratio: 1/1;
  border: none;
  padding-bottom: 2px;
  cursor: pointer;
}

.post-card img {
  width: 500px;
}

.title {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0;
}

.author {
  font-size: 0.75rem;
}

.body {
  max-width: 700px;
}

.interactions {
    display: flex;
    flex-wrap: none;
    gap: 0.5rem;
    border-top: 1px solid #6363;
    padding-top: 0.5rem;
}

.follow-button {
    max-width: fit-content;
}

.comment_container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hidden {
  display: none;
}

.inactive {
  color: #63636350;
}

.interaction-count {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
}
`
postTemplate.innerHTML = `
  <a href="" class="post-card">
    <p class="title"></p>
    <img src="/images/noroff-logo.png" alt="img">
    <p class="body"></p>
    <div class="interaction-count">
      <p class="comments-count"></p>
      <p class="reactions-count"></p>
    </div>
  </a>
`
interactivePostTemp.innerHTML = `
  <div class="post-card">
  <p class="title"></p>
  <p class="author"></p>
  <button class="follow-button" title="Follow">⭐</button>
    <img src="/images/noroff-logo.png" alt="img">
    <p class="body"></p>
    <div class="interaction-count">
      <p class="comments-count"></p>
      <p class="reactions-count"></p>
    </div>
    <div class="interactions">
        <button class="like-button inactive" title="Like">💗</button>
        <button class="lol-button inactive" title="LOL">😂</button>
        <button class="toggle-button" title="Comment">💬</button>
        <button class="delete-btn" title="Delete">❌</button>
        <button title="Edit"><a class="edit-button" style="text-decoration: none;" href="">🔨</a></button>
    </div>
    <form name="comment" class="comment_container hidden">
      <textarea name="body" class="comment_field"></textarea>
      <button class="comment_send">Comment</button>
    </form>
    <div class="comment_all">
    </div>
  </div>
`
commentTemp.innerHTML = `
  <div class="comment_uniq">
    <p class="comment_author"></p>
    <p class="comment_body"></p>
    <div class="comment_reply_interactions">
      <button class="comment_reply_button">Reply ↩</button>
      <button class="comment_delete_button">Delete ✖</button>
    </div>
    <form name="comment" class="comment_container hidden">
      <textarea name="body" class="comment_field"></textarea>
      <button class="comment_send">Reply</button>
    </form>
      <div class="comment_reply">
      </div>
  </div>
`
