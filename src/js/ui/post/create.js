import { createPost } from "../../api/post/create"
import formatFormData from "../../utilities/format-form-data"

export async function onCreatePost(event) {
    event.preventDefault()
    const button = document.querySelector("#create")

    const formData = formatFormData(event)
    
    try {
    button.setAttribute("disabled", true)
    await createPost(formData)
    } catch (e) {
        console.error(e)
    } finally {
        button.removeAttribute("disabled")
    }
}
