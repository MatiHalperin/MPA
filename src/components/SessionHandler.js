class SessionHandler {
    isLoggedIn() {
        return sessionStorage.getItem("userId") !== null && sessionStorage.getItem("accessToken") !== null;
    }
}

export default SessionHandler;
