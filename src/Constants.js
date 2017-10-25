
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'

export const LOGIN_FORM_NAME = 'login'
export const SIGNUP_FORM_NAME = 'signup'


export const formNames = {
  signup: SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME
}

export const paths = {
  login: LOGIN_PATH,
  signup: SIGNUP_PATH
}

export default { ...paths, ...formNames }
