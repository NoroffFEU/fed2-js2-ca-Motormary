import { API_AUTH_LOGIN } from "../constants"

export async function login(data) {
    try {
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
          console.log(responseData)
          alert(responseData.errors.map((error) => error.message).join("\r\n") + `\r\nstatus code: ${responseData.statusCode}`)
        }
      } catch (e) {
        console.log(e)
      }
}
