import { onLogout } from "../auth/logout"

export function setLogoutListener() {
    const logoutBtn = document.querySelector("#logout")
    logoutBtn.addEventListener("click", onLogout)
}