const ADMIN_PASSWORD = "sylvaauris2025";
const AUTH_KEY = "sylva_admin_auth";

export function login(password){
    if (password == ADMIN_PASSWORD) {
        sessionStorage.setItem(AUTH_KEY, "true");
        return true;

    }
    return false;
}

export function logout() {
    sessionStorage.removeItem(AUTH_KEY);

}

export function isAuthenticated(){
    return sessionStorage.getItem(AUTH_KEY) == "true";
}