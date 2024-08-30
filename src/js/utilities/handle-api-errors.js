export default function handleApiErrors(responseData) {
    alert(
        responseData.errors.map((error) => error.message).join("\r\n") +
          `\r\nstatus code: ${responseData.statusCode}`
      )
}