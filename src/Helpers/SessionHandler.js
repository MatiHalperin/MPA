class SessionHandler {
    static isLoggedIn() {
      return sessionStorage.getItem("userId") !== null && sessionStorage.getItem("accessToken") !== null;
    }

    static isAdmin() {
      return sessionStorage.getItem("admin") !== null;
    }
  
    static logOut() {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("admin");
    }
  }
  
  export default SessionHandler;