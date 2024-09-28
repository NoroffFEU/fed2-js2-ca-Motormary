import handleApiErrors from "../../utilities/handle-api-errors"
import { API_AUTH_REGISTER, API_OPTIONS } from "../constants"

/**
 * @description Registers a new user account with the provided details.
 *
 * @async
 * @function register
 * @param {Object} user - User object.
 * @param {string} user.name - Users name.
 * @param {string} user.email - User email.
 * @param {string} user.password - Account password.
 * @param {string} [user.bio] - User bio (optional).
 * @param {string} [user.banner] - URL containing user banner image (optional).
 * @param {string} [user.avatar] - URL containing user avatar image (optional).
 * @returns {Promise<void>} An empty promise.
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
