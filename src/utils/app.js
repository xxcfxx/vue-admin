import cookie from "cookie_js";

const ADMIN_TOKEN = 'admin_token';
const USERNAME = 'username';
export function getToken() {
    return cookie.get(ADMIN_TOKEN);
}
export function setToken(token) {
    return cookie.set(ADMIN_TOKEN, token)
}
export function removeToken() {
    return cookie.remove(ADMIN_TOKEN)
}
export function setUserName(username) {
    return cookie.set(USERNAME, username);
}
export function getUserName() {
    return cookie.get(USERNAME);
}
export function removeUserName() {
    return cookie.remove(USERNAME)
}