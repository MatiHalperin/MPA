class SessionHandler {
    static isLoggedIn() {
      return sessionStorage.getItem("userId") !== null && sessionStorage.getItem("accessToken") !== null;
    }

    static isMusician() {
      return sessionStorage.getItem("isMusician") === true;
    }

    static isAdmin() {
      return sessionStorage.getItem("isAdmin") === "true";
    }
  
    static logOut() {
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("isMusician");
      sessionStorage.removeItem("isAdmin");
    }
  }
  
  export default SessionHandler;