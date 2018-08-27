class Server {
  static getURL() {
    return "http://10.10.1.2:3000";
  }

  static async getJson(path) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async postJson(path, requestBody) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }

  static async patchJson(path, requestBody) {
    try {
      let response = await fetch(Server.getURL() + path, {
        method: "PATCH",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}

export default Server;
