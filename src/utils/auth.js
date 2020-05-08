const TOKEN_KEY = 'token-key'
const IM_KEY = 'im-pass-key'

export function getToken() {
	return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
	return localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken() {
	return localStorage.removeItem(TOKEN_KEY)
}
export function getIMPass() {
  return localStorage.getItem(IM_KEY)
}

export function setIMPass(im_pass) {
  return localStorage.setItem(IM_KEY, im_pass)
}

export function removeIMPass() {
  return localStorage.removeItem(IM_KEY)
}
