import { environment } from "src/environments/environment"
export let AuthAPI = {
  signUpAPI:`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FireBaseAPIKey}`,
  signInAPI:`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FireBaseAPIKey}`
}
