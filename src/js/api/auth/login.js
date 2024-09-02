import handleApiErrors from "../../utilities/handle-api-errors"
import { API_AUTH_LOGIN, API_OPTIONS } from "../constants"

export async function login({ email, password }) {
  const data = {
    email: email,
    password: password,
  }
  const response = await fetch(API_AUTH_LOGIN, {
    ...API_OPTIONS("POST"),
    body: JSON.stringify(data),
  })

  const responseData = await response.json()
  if (response.ok) {
    console.log(responseData)
    localStorage.token = responseData.data.accessToken
    localStorage.username = responseData.data.name
    window.location.href = "/"
  } else {
    handleApiErrors(responseData)
  }
}
