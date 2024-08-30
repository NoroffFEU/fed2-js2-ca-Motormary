import { register } from "../../api/auth/register"

export async function onRegister(event) {
  event.preventDefault()

  const btn = document.querySelector("#registerBtn")

  const formData = new FormData(event.target)

  const formObject = Object.fromEntries(formData.entries())

  console.log(formData)

  btn.setAttribute("disabled", true)
  await register(formObject)
  btn.removeAttribute("disabled")
}
