export async function updatePost(id, { title, body, tags, media }) {
  const data = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  }

  const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
    ...API_OPTIONS("PUT"),
    body: JSON.stringify(data),
  })

  const responseData = await response.json()

  if (response.ok) {
    localStorage.removeItem("posts")
    alert("Post updated successfully")
  } else {
    handleApiErrors(responseData)
  }
}
