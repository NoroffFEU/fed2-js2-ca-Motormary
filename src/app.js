import "./css/style.css"

import router from "./js/router/index.js"
import { setLogoutListener } from "./js/ui/global/logout.js"

await router(window.location.pathname);

if (localStorage.token) {
    setLogoutListener()
}
