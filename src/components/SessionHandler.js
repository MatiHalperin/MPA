class SessionHandler {
  static isLoggedIn() {
    return sessionStorage.getItem("userId") !== null && sessionStorage.getItem("accessToken") !== null;
  }

  static logOut() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("accessToken");
  }
}

export default SessionHandler;
