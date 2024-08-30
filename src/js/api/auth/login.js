import { API_AUTH_LOGIN } from "../constants"

export async function login({ email, password }) {
  const data = {
    email: email,
    password: password,
  }
  const response = await fetch(API_AUTH_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  const responseData = await response.json()
  if (response.ok) {
    localStorage.token = responseData.accessToken
    window.location.href = "/"
  } else {
    alert(
      responseData.errors.map((error) => error.message).join("\r\n") +
        `\r\nstatus code: ${responseData.statusCode}`
    )
  }
}
