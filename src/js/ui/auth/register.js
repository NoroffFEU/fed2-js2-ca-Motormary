import { register } from "../../api/auth/register"
import formatFormData from "../../utilities/format-form-data"

/**
 * @description Handles registration submit event
 * 
 * @param {FormDataEvent} event
 * @async
 * @returns {Promise<void>}
 */
export async function onRegister(event) {
  event.preventDefault()

  const btn = document.querySelector("#registerBtn")

  const formData = formatFormData(event)

  try {
    btn.setAttribute("disabled", true)
    await register(formData)
  } catch (e) {
    console.error(e)
  } finally {
    btn.removeAttribute("disabled")
  }
}
