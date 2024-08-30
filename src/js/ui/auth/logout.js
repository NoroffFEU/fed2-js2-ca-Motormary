import { getKey } from "../../api/auth/key"

export function onLogout() {
    localStorage.removeItem("token")
    window.location.href = "/auth/login/"
}
