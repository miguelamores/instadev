export default function globalSetup() {
  process.env.LOGIN_USERNAME = process.env.VITE_LOGIN_USERNAME
  process.env.LOGIN_PASS = process.env.VITE_LOGIN_PASS
}
