import { register } from "../../api/auth/register"
import formatFormData from "../../utilities/format-form-data"

export async function onRegister(event) {
  event.preventDefault()

  const btn = document.querySelector("#registerBtn")

  const formData = formatFormData(event)

  console.log(formData)

  btn.setAttribute("disabled", true)
  await register(formObject)
  btn.removeAttribute("disabled")
}
