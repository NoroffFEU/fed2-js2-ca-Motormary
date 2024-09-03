import { createPost } from "../../api/post/create"
import formatFormData from "../../utilities/format-form-data"

export async function onCreatePost(event) {
    event.preventDefault()
    const button = document.querySelector("#create")

    const formData = formatFormData(event)

    const dataWithMedia = {
        ...formData,
        media: formData?.media ? {
            url: formData.media,
            alt: "media preview"
        } : null
    }
    
    try {
    button.setAttribute("disabled", true)
    await createPost(dataWithMedia)
    } catch (e) {
        console.error(e)
    } finally {
        button.removeAttribute("disabled")
    }
}
