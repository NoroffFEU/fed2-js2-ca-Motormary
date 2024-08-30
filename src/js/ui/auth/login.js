import { login } from "../../api/auth/login"
import formatFormData from "../../utilities/format-form-data"

export async function onLogin(event) {
    event.preventDefault()
    const loginBtn = document.querySelector("button")

    const formData = formatFormData(event)

    loginBtn.setAttribute("disabled", true)
    await login(formData)
    loginBtn.removeAttribute("disabled")

}
