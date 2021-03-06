class Server {
  static getURL() {
    return "https://mpaserver.herokuapp.com";
  }

  static async interact(method, path, body) {
    try {
      let requestInit = {
        method: method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      }

      if (body)
        requestInit.body = JSON.stringify(body);

      let response = await fetch(Server.getURL() + path, requestInit);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Server;