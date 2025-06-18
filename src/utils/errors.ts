export class FileError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileError'
  }
}

export class PostCreateError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PostCreateError'
  }
}
