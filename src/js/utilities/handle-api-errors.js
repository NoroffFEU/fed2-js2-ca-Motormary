export default function handleApiErrors(responseData) {
  if (responseData.errors) {
    alert(
      responseData.errors.map((error) => error.message).join("\r\n") +
        `\r\nstatus code: ${responseData.statusCode}`
    )
  } else {
    alert(responseData)
  }
}
