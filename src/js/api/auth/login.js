import handleApiErrors from "../../utilities/handle-api-errors"
import { API_AUTH_LOGIN, API_OPTIONS } from "../constants"

/**
 * @description Handles user login and stores an access token in localStorage before redirecting user to the home screen.
 * 
 * @param {Object} auth
 * @param {string} auth.email - The email address of the user. 
 * @param {string} auth.password - The password for the user account.
 * @returns {Promise<void>}
 * 
 */
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
    // Store token and username
    localStorage.token = responseData.data.accessToken
    localStorage.username = responseData.data.name
    window.location.href = "/"
  } else {
    handleApiErrors(responseData)
  }
}
