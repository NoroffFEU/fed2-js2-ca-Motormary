import handleApiErrors from "../../utilities/handle-api-errors"
import { API_AUTH_REGISTER, API_OPTIONS } from "../constants"

/**
 * @description Registers a new user account with the provided details.
 *
 * @async
 * @function register
 * @param {Object} user - An object containing user registration details.
 * @param {string} user.name - The name of the user.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.password - The password for the user account.
 * @param {string} [user.bio] - A brief bio for the user's profile (optional).
 * @param {string} [user.banner] - URL or data for the user's profile banner image (optional).
 * @param {string} [user.avatar] - URL or data for the user's avatar image (optional).
 * @returns {Promise<void>} A promise that resolves when the registration process is complete.
 * @throws {Error} Will throw an error if the registration fails.
 *
 * @example
 * register({
 *   name: "John Doe",
 *   email: "john.doe@stud.noroff.no",
 *   password: "password123",
 *   bio: "Software Developer",
 *   banner: "banner-image-url",
 *   avatar: "avatar-image-url"
 * });
 */

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
