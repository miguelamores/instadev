export function getErrorMessage(error: unknown) {
  let message: string

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    // in this case, we convert the error to a string
    // because it could be a number or any other type
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong, please try again later'
  }

  return message
}
