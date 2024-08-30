import handleApiErrors from "../../utilities/handle-api-errors"
import { API_AUTH_REGISTER, API_OPTIONS } from "../constants"

export async function register({ name, email, password, bio, banner, avatar }) {
  const data = {
    name: name,
    email: email,
    password: password,
    bio: bio,
    banner: banner,
    avatar: avatar,
  }

  const response = await fetch(API_AUTH_REGISTER, {
    ...API_OPTIONS("POST"),
    body: JSON.stringify(data),
  })

  if (response.ok) {
    alert("Account created successfully")
  } else {
    const data = await response.json()
    handleApiErrors(data)
  }
}
